import React from 'react';
// import ProfileBgAnimation from '../ProfileBgAnimation';
import { ProfileContainer, ProfileBg, ProfileLeftContainer, ProfileImg, ProfileRightContainer, ProfileInnerContainer, TextLoop, Title, Span, Description,SocialMediaIcons,SocialMediaIcon, ResumeButton } from './ProfileStyle';
// import ProfileImage from '../../images/ProfileImage.jpg';
import Typewriter from 'typewriter-effect';
import { Bio } from '../Utils/data/strings';

const Kishan_hero=()=>{
    return (
    <div id="about">
            <ProfileContainer>
                <ProfileBg>
                    {/* <ProfileBgAnimation/> */}
                </ProfileBg>
                <ProfileInnerContainer>
                    <ProfileLeftContainer>
                        <Title>
                            Hello, I am <br/>{Bio.name}
                        </Title>
                        <TextLoop>
                            I am 
                            <Span>
                                <Typewriter
                                 options={{
                                    strings: Bio.roles,
                                    autoStart: true,
                                    loop: true,
                                }}/>
                            </Span>
                        </TextLoop>
                        <Description>{Bio.description}</Description>
                        <ResumeButton href={Bio.resume_gamedeveloper} target="_blank">Review CV</ResumeButton>
                    </ProfileLeftContainer>
                    <ProfileRightContainer>
                                {/* <ProfileImg src={ProfileImage} alt="Profile"/> */}
                    </ProfileRightContainer>
                </ProfileInnerContainer>
            </ProfileContainer>
    </div>)
}

export default Kishan_hero;