import * as React from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from '@reach/router'
import useMediaRecorder from '@hooks/media/useMediaRecorder'
import { gql, useMutation } from '@apollo/client'

const UPLOAD_RECORDING = gql`
    mutation($file: Upload!) {
        uploadRecording(file: $file) {
            success
        }
    }
`

const AskQuestion = (props: RouteComponentProps): JSX.Element => {
    const { isRecording, recording, toggleRecording } = useMediaRecorder()
    const [mutate, { loading, error }] = useMutation(UPLOAD_RECORDING)

    const upload = async e => {
        const { data } = await mutate({ variables: { file: recording } })
        console.log(data, 'AFTER')
    }

    if (error) {
        return <div>Oh oh</div>
    }

    if (loading) {
        return <div>loading</div>
    }

    return (
        <div id="post-view">
            <h2>Ask a question</h2>
            <InputsContainer>
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" name="title" />
                </div>
                <div>
                    <label htmlFor="description">Helpful notes if any</label>
                    <textarea
                        placeholder="for exmaple: React version, native language"
                        id="notes"
                        name="title"
                        style={{ height: '128px' }}
                    />
                </div>
            </InputsContainer>
            {/* <CodeBlock>
                <h2>Code block</h2>
                <iframe
                    src="https://codesandbox.io/embed/happy-curie-ok3i4?fontsize=14&hidenavigation=1&theme=dark&view=editor"
                    style={{ width: '100%', height: '500px', overflow: 'hidden' }}
                    title="happy-curie-ok3i4"
                    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                ></iframe>
            </CodeBlock> */}
            <SRContainer>
                <div style={{ marginBottom: '32px' }}>
                    <h2>Record a screen share for better context</h2>
                    <button
                        onClick={toggleRecording}
                        style={{ display: 'inline-block', marginRight: '8px' }}
                    >
                        {isRecording ? 'Stop' : 'Start Recording'}
                    </button>
                    <button>Remove</button>
                </div>

                <Video>
                    {recording !== null ? (
                        <video
                            autoPlay
                            src={recording && window.URL.createObjectURL(recording)}
                        />
                    ) : null}
                </Video>
                <div>
                    <button onClick={upload}>Submit</button>
                </div>
            </SRContainer>
        </div>
    )
}

const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    @media screen and (min-width: 768px) {
        width: 60%;
    }

    input,
    textarea {
        display: inline-block;
        width: 100%;
    }

    input {
        margin-bottom: 64px;
    }

    label {
        display: block;
        margin-bottom: 8px;
    }
`

const SRContainer = styled.div`
    margin-top: 64px;
`

const CodeBlock = styled.div`
    margin-top: 64px;
`

const Video = styled.div`
    width: 100%;

    video {
        object-fit: contain;
        width: 100%;
        height: 100%;

        @media screen and (min-width: 768px) {
            width: 640px;
            height: 360px;
        }
    }
`

export default AskQuestion
