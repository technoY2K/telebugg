import Web3 from 'web3'
import { useStaticQuery, graphql } from 'gatsby'

const web3 = new Web3('http://localhost:8545')

export type iVoteContract = {
    getAllCandidates: () => Promise<[error: boolean, data: string[]]>
    getTotalVotes: (name: string) => Promise<[error: boolean, data: number]>
    voteFor: (name: string) => Promise<boolean>
}

export default function useContract(): iVoteContract {
    const { allContractJson } = useStaticQuery(
        graphql`
            query MyQuery {
                allContractJson {
                    nodes {
                        abi {
                            constant
                            inputs {
                                internalType
                                name
                                type
                            }
                            outputs {
                                internalType
                                name
                                type
                            }
                            name
                            payable
                            stateMutability
                            type
                        }
                    }
                }
            }
        `
    )

    const contract = new web3.eth.Contract(
        allContractJson.nodes[0].abi,
        '0x807688a799cAaE52C9915C974F2CC78B0EfF2D9E'
    )

    const c = {
        getAllCandidates: async (): Promise<[error: boolean, data: string[]]> => {
            return Promise.resolve([false, ['alice', 'bob', 'eve']])
        },

        getTotalVotes: async (name: string): Promise<[error: boolean, data: number]> => {
            try {
                const result = await contract.methods
                    .totalVotesFor(Web3.utils.fromAscii(name))
                    .call()

                return [false, parseInt(result)]
            } catch (error) {
                return [true, 0]
            }
        },

        voteFor: async (name: string): Promise<boolean> => {
            try {
                const tx = await contract.methods.voteForCandidate(
                    Web3.utils.fromAscii(name)
                )

                const createTx = await web3.eth.accounts.signTransaction(
                    {
                        from: '0x9a1b9f951e61fD34ce9414D0eba09b4C76750e6E', // this would normally be from the browser wallet
                        to: contract.options.address,
                        data: tx.encodeABI(),
                        gas: await tx.estimateGas(),
                    },
                    '0x53382a69ea87df06afe7338256891d965b626278515cde11d3be7c5546e61376'
                )

                await web3.eth.sendSignedTransaction(createTx.rawTransaction as string)

                return true
            } catch (error) {
                return false
            }
        },
    }

    return c
}
