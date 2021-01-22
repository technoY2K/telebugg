import * as React from 'react'
import Cotter from 'cotter'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import { RouteComponentProps } from '@reach/router'

import { useAuth } from '@hooks/auth'

export default function Login(props: RouteComponentProps) {
    const { saveToken } = useAuth()
    const [error, setError] = React.useState<boolean>(false)

    const loginFormSetup = async () => {
        try {
            const cotter = new Cotter({
                ApiKeyID: `${process.env.GATSBY_COTTER_API}`,
                Styles: {
                    input_label: {
                        color: '#f8f8f2',
                        fontSize: 16,
                    },
                },
            })
            const response = await cotter.signInWithLink().showEmailForm()
            setTimeout(() => {
                const redirectURL = props.location?.state?.prevURL ?? '/'
                // saveToken should have a cb
                navigate(redirectURL)
                saveToken(response)
            }, 2000)
        } catch (err) {
            setError(true)
        }
    }

    React.useEffect(() => {
        loginFormSetup()
    }, [])

    return (
        <FormWrapper>
            <Form id="cotter-form-container">
                <h3>We use magic links for account creation and logging in.</h3>
            </Form>
            {error ? (
                <p>An error has occured while attempting to login in, please try again</p>
            ) : null}
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;

    margin-top: 64px;
`

const Form = styled.div`
    width: 300px;
    height: 500px;

    h3 {
        margin-bottom: 0;
    }
`
