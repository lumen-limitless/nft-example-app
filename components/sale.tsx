'use client';
import { useReadNftMintedCount, useWriteNftBuyPublic } from '@/lib/wagmi';
import { DialogTitle } from '@radix-ui/react-dialog';
import { CheckCircle, Loader2 } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'react-use';
import { toast } from 'sonner';
import { formatEther, parseUnits } from 'viem';
import { sepolia } from 'viem/chains';
import {
  useAccount,
  useBalance,
  useChainId,
  useWaitForTransactionReceipt,
} from 'wagmi';
import Logo from './logo';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription } from './ui/dialog';

const MAX_MINTABLE = 100n;
const PUBLIC_PRICE = parseUnits('0.0001', 18);

export const Sale: React.FC = () => {
  const [numTokensInput, setNumTokensInput] = useState<string>('');
  const [numTokens, setNumTokens] = useState<number>(0);
  const [transactionHash, setTransactionHash] = useState<`0x${string}` | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  useDebounce(
    () => {
      if (numTokensInput === '') return;
      setNumTokens(parseInt(numTokensInput));
    },
    500,
    [numTokensInput, numTokens],
  );
  const { address, isConnected } = useAccount();

  const chainId = useChainId();

  const { data: balance } = useBalance({
    address: address,
    chainId: sepolia.id,
  });

  const sufficientBalance = useMemo(() => {
    if (!balance) return false;

    return balance.value >= PUBLIC_PRICE * BigInt(numTokens);
  }, [balance, numTokens]);

  const { data: mintedCount } = useReadNftMintedCount({
    args: [address!],
    chainId: sepolia.id,
  });

  const { writeContractAsync, isPending, reset, status } =
    useWriteNftBuyPublic();

  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccessful,
  } = useWaitForTransactionReceipt({
    hash: transactionHash!,
    confirmations: 1,
  });

  useEffect(() => {
    if (isTransactionSuccessful) {
      setTimeout(() => {
        setDialogOpen(false);
        setTransactionHash(null);
      }, 1000);
    }
  }, [isTransactionSuccessful]);

  const handleBuy = async () => {
    try {
      const result = await writeContractAsync({
        args: [BigInt(numTokens)],
        chainId: sepolia.id,
        value: BigInt(numTokens) * PUBLIC_PRICE,
      });
      setTransactionHash(result);
      setDialogOpen(true);
    } catch (error) {
      toast.error('NFT purchase failed. Please try again.');
      reset();
    }
  };

  if (!isConnected)
    return (
      <div className="mx-auto flex flex-col items-center text-center">
        <Logo />
        <p>Connect a wallet to continue.</p>
      </div>
    );

  if (chainId !== sepolia.id)
    return (
      <div className="mx-auto flex flex-col items-center text-center">
        <Logo />
        <p>Please switch to Sepolia network to continue.</p>
      </div>
    );

  if (mintedCount === undefined)
    return (
      <div className="mx-auto flex flex-col items-center text-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (mintedCount! >= MAX_MINTABLE)
    return (
      <div className="mx-auto flex flex-col items-center text-center">
        <Logo />
        <p>You have minted the maximum amount of tokens available.</p>
      </div>
    );

  return (
    <div className="relative z-20 mx-auto mb-32 flex w-full max-w-md flex-col items-center justify-center gap-3 text-center md:mb-0">
      <Logo />
      {
        <span>
          {Number(MAX_MINTABLE - mintedCount!)} tokens available for minting.
        </span>
      }
      <input
        type="text"
        onChange={(e) => {
          e.preventDefault();
          const input = e.target.value.replace(/\D/g, '');
          if (Number.isNaN(input)) {
            setNumTokensInput('');
            return;
          }
          setNumTokensInput(
            BigInt(input) >= MAX_MINTABLE - mintedCount!
              ? (MAX_MINTABLE - mintedCount!).toString()
              : input,
          );
        }}
        value={numTokensInput}
        placeholder="Enter number of tokens"
        className="w-full rounded border-2 border-gray-800 bg-black p-3 focus:border-gray-700 focus:outline-none"
      />
      {numTokensInput === '' ? (
        <div className="p-6" />
      ) : numTokensInput !== numTokens.toString() ? (
        <Loader2 className="animate-spin" />
      ) : sufficientBalance ? (
        <Button onClick={handleBuy} disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="animate-spin" /> Sign transaction
            </>
          ) : (
            <>
              Buy {numTokens} NFT for{' '}
              {formatEther(PUBLIC_PRICE * BigInt(numTokens))} ETH
            </>
          )}
        </Button>
      ) : (
        <div className="p-3">Insufficient Balance</div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          {isTransactionLoading && (
            <>
              <DialogTitle>
                Purchasing {numTokens} NFT for{' '}
                {formatEther(PUBLIC_PRICE * BigInt(numTokens))} ETH
              </DialogTitle>
              <DialogDescription>Transaction pending...</DialogDescription>
              <Loader2 className="h-16 w-16 animate-spin" />
            </>
          )}
          {isTransactionSuccessful && (
            <>
              <DialogTitle>Purchase Successful</DialogTitle>
              <DialogDescription>Your NFTs have been minted!</DialogDescription>
              <CheckCircle className="h-16 w-16 text-green-500" />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
