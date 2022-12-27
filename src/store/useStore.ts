import create from 'zustand'
import { devtools } from 'zustand/middleware'
import createUISlice, { UISlice } from './createUISlice'

//TODO: fix type too complex error
interface RootSlice extends UISlice {}

const useStore = create<RootSlice>()(
  devtools((...a) => ({
    ...createUISlice(...a),
  }))
)

export default useStore
