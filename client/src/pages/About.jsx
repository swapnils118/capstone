import styled from "styled-components";


const ContainerMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    color: rgb(120, 120, 120);
    gap: 1rem
`;

const Heading = styled.div`
    color: rgb(120, 120, 120);
    font-size: 2rem;
    `;

const UL = styled.ul`
    color: rgb(120, 120, 120);
`;

const LI = styled.li`
    color: rgb(120, 120, 120);
    margin: 1rem 0rem;
`;

const Description = styled.div`
    font-size: 1rem;
    color: rgb(120, 120, 120);
`;

const BR = styled.hr`
    background-color: grey;
    margin: 0.5rem 0;
    width: 100%;
`;

export default function About() {



    return (
        <ContainerMain >
            <Heading>
                About
            </Heading>
            <BR />

            <Description>
                Our project aims to develop a robust and scalable video streaming platform akin to YouTube,
                leveraging modern web technologies including HTML, CSS, JavaScript, ReactJS, MongoDB,
                and Node.js. This platform will allow users to view, and interact with videos
                seamlessly.
            </Description>

            <Heading>
                Key Features
            </Heading>

            <UL>
                <LI>
                    User Authentication and Authorization: Users can create accounts, log in securely,
                    and manage their profiles. Authentication mechanisms will be implemented using JWT tokens
                    for secure access to the platform.
                </LI>
                <LI>
                    Video Streaming: Utilizing HTML5 video player capabilities, our platform will enable
                    smooth streaming of uploaded videos. Adaptive streaming techniques will be employed to
                    ensure optimal playback quality based on the user's internet connection.
                </LI>
                <LI>
                    Responsive Design: The user interface will be designed to be responsive across
                    various devices, including desktops, tablets, and smartphones, ensuring a seamless
                    viewing experience regardless of screen size.
                </LI>
                <LI>
                    Search : Users can search for videos using keywords
                </LI>
            </UL>

            <Heading>
                Technology Stack
            </Heading>
            <UL>
                <LI>
                    Frontend: HTML, CSS, JavaScript, ReactJS
                </LI>
                <LI>
                    Backend: Node.js for server-side logic and API development
                </LI>
                <LI>
                    Database: MongoDB for storing user data, video metadata, and related information
                </LI>
                <LI>
                    Authentication: JWT for secure user authentication and authorization
                </LI>
            </UL>

            <Description>
                By harnessing the power of modern web development technologies and best practices,
                our video streaming platform will offer users a compelling and immersive experience,
                fostering a vibrant community around video content creation and consumption.
            </Description>
        </ContainerMain>
    )
}