import * as React from 'react'
import styled from 'styled-components'

function Footer(props) {
    return (
        <footer className={props.className}>
            <h4>
                &#169;<span>{` ${new Date().getFullYear()} telebugg`}</span>
            </h4>
            <div className="social-icons">
                <a href="https://twitter.com/telebugg" target="_blank" rel="noreferrer">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M8.2177 20.2976C15.798 20.2976 19.9327 14.0329 19.9327 8.58261V8.05011C20.7362 7.46091 21.435 6.74089 22 5.92012C21.2567 6.26235 20.4637 6.48437 19.6507 6.57791C20.5139 6.06164 21.1597 5.24885 21.4675 4.2913C20.6598 4.76183 19.7822 5.10021 18.8677 5.29365C17.3053 3.64491 14.7069 3.56109 13.0415 5.10571C11.9701 6.10222 11.5157 7.59694 11.8512 9.02114C8.54594 8.85772 5.46574 7.29769 3.37823 4.72983C2.28095 6.60789 2.84519 9.01622 4.66249 10.2114C4.00661 10.1858 3.36464 10.0146 2.78309 9.71026V9.7729C2.78257 11.7293 4.15628 13.417 6.07204 13.8136C5.46884 13.9751 4.83671 13.9965 4.22396 13.8763C4.76475 15.5538 6.31437 16.7003 8.07674 16.7267C6.62377 17.8749 4.82287 18.4936 2.97103 18.4808C2.65779 18.4808 2.31323 18.4495 2 18.4182C3.84433 19.6513 6.0148 20.3057 8.23336 20.2976"
                        ></path>
                    </svg>
                </a>

                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M20.875 2H3.09375C2.46875 2 2 2.5 2 3.09375V20.875C2 21.5 2.5 21.9687 3.09375 21.9687H12.6875V14.2188H10.0625V11.1875H12.6562V8.96874C12.6562 6.375 14.2187 4.96875 16.5312 4.96875C17.625 4.96875 18.5937 5.0625 18.875 5.09375V7.78125H17.2812C16.0312 7.78125 15.7812 8.375 15.7812 9.25V11.1875H18.7812L18.4062 14.25H15.8125V22H20.9062C21.5312 22 22 21.5 22 20.9062V3.125C22 2.46875 21.5 2 20.875 2Z"
                    ></path>
                </svg>
            </div>
        </footer>
    )
}

const StyledFooter = styled(Footer)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding-top: 32px;

    .social-icons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        width: 64px;

        svg {
            color: #282a36;
        }
    }
`

export default StyledFooter
