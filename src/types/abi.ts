export const IERC721 = [
  'function balanceOf(address _owner) external view returns (uint256)',
  'function ownerOf(uint256 _tokenId) external view returns (address)',
  'function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable',
  'function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable',
  'function transferFrom(address _from, address _to, uint256 _tokenId) external payable',
  'function approve(address _approved, uint256 _tokenId) external payable',
  'function setApprovalForAll(address _operator, bool _approved) external',
  'function getApproved(uint256 _tokenId) external view returns (address)',
  'function isApprovedForAll(address _owner, address _operator) external view returns (bool)',
  'function tbaMint(address to) public',
  'function tokenURI(uint256 tokenId) public view returns(string memory)',
  'function tokensOf(address owner_) external view returns (uint256[] memory tokenIds)'
]

export const IERC1155 = [
  'function uri(uint256) public view returns (string memory)',
  'function balanceOf(address account, uint256 id) external view returns (uint256)',
  'function balanceOfBatch(address[] calldata accounts, uint256[] calldata ids) external view returns (uint256[] memory)',
  'function setApprovalForAll(address operator, bool approved) external',
  'function isApprovedForAll(address account, address operator) external view returns (bool)',
  'function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes calldata data) external',
  'function safeBatchTransferFrom(address from, address to, uint256[] calldata ids, uint256[] calldata amounts, bytes calldata data) external',
  'function tbaMint(address to, uint256 amount, bytes memory data) public',
  'function tokenCountOf(address owner) external view returns (uint256)',
  'function tokensOf(address owner) external view returns (uint256[] memory tokenIds_, uint256[] memory balances_)'
]

export const IERC20 = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function transfer(address to, uint amount) returns (bool)',
  'function mint(address to, uint amount)'
]

export const IREG = [
  'function createAccount(address implementation,uint256 chainId,address tokenContract,uint256 tokenId,uint256 salt,bytes calldata initData) external returns (address)',
  'function account(address implementation, uint256 chainId, address tokenContract, uint256 tokenId, uint256 salt) external view returns (address)'
]

export const ITBA = [
  'function token() external view returns (uint256 chainId, address tokenContract, uint256 tokenId)',
  'function state() external view returns (uint256)',
  'function isValidSigner(address signer, bytes calldata context) external view returns (bytes4 magicValue)',
  'function execute(address to, uint256 value, bytes calldata data, uint256 operation) external payable returns (bytes memory result)'
]

export const DEPLOYED = {
  nft: '0x54615c4682cc43e2112f5100e9867B720F7Bd3A8',
  tkn: '0x6676bef8246b9E80DDc9e39Da31042b13BddD04b',
  mts: '0xE5Cba175f956e2CA7d4da45C2cBfBd895d8cA2D0',
  tAcc: '0x6ac1677030873edF4D10526A913670eB145f2482',
  tReg: '0x8f099A243bF333Da7520fA2CfE5d9b7478389786'
} as const
