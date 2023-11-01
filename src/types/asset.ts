export type asset = [
  bigint,
  {
    metadata: Metadata6551 | Metadata
    amount?: bigint | undefined
  }
]

export interface Metadata {
  attributes: any
  background_color: any
  description: string
  image: string
  name: string
  type?: number
}

export interface Metadata6551 extends Metadata {
  walletAddress: string
}

export type ErcAsset = Map<bigint, { metadata: Metadata; amount?: bigint }>
export type Erc6551Asset = Map<bigint, { metadata: Metadata6551; amount?: bigint }>
