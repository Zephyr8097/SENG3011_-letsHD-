import React from "react";
import styled from "styled-components";
// Import configs
import * as CONFIG from "../Constants/config";
// Import icons
import ShieldTwoToneIcon from "@mui/icons-material/ShieldTwoTone";
import BadgeTwoToneIcon from "@mui/icons-material/BadgeTwoTone";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div`
  justify-content: center;
  text-align: center;
  margin-top: 20px;
  width: 100%;
  height: 100px;
  font-size: 40px;
  font-weight: bold;
  color: ${CONFIG.primaryColor};
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const Left = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
`;

const Right = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  font-size: 30px;
  font-weight: 300;
`;

const Content = styled.div`
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 10px;
  font-size: 20px;
  color: grey;
`;

const Footer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: ${CONFIG.primaryColor};
  font-size: 25px;
  font-weight: 400;
`;

const Help = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const HomeBottom = ({ expand }) => {
  if (expand) return <ExpandedHomeBottom />;
  else return <CollapsedHomeBottom />;
};

const ExpandedHomeBottom = () => {
  return (
    <Wrapper>
      <Footer>
        <Help
          href={CONFIG.feedbackLink}
          style={{
            color: CONFIG.primaryColor,
          }}
        >
          Help us improve
        </Help>
        <AssignmentOutlinedIcon
          sx={{
            fontSize: "30px",
            marginLeft: "4px",
            marginTop: "5px",
            color: CONFIG.primaryColor,
          }}
        />
      </Footer>
    </Wrapper>
  );
};

const CollapsedHomeBottom = () => {
  return (
    <Wrapper>
      <Banner>About us</Banner>
      <Body>
        <Left>
          <Title>
            <div>Who we are &nbsp;</div>
            <BadgeTwoToneIcon
              sx={{
                fontSize: "30px",
                marginTop: "4px",
                color: CONFIG.primaryColor,
              }}
            />
          </Title>
          <Content>
            We are a small team of software engineers that care about your
            health being.
          </Content>
          <Content>
            We wish to do everything within our power to ensure you are always
            out of the reach of diseases and viruses.
          </Content>
          <Content>Together, we can stop the spread of pendemic.</Content>
        </Left>
        <Right>
          <Title>
            <div>What we do &nbsp;</div>
            <ShieldTwoToneIcon
              sx={{
                fontSize: "30px",
                marginTop: "4px",
                color: CONFIG.primaryColor,
              }}
            />
          </Title>
          <Content>
            We collect the most up to date information about the pendemics and
            outbreaks that are currently happening around the globe from all
            sorts of reliable sources (mainly from CDC as we believe it is most
            imformative and reliable), and present them to our users.
          </Content>
          <Content>
            We offer our users easy access to our database that we grinded hard
            for, users can simply input a period of time they wish to travel,
            the location they are traveling to and an optional keyword in order
            to retrieve data.
          </Content>
        </Right>
      </Body>
    </Wrapper>
  );
};

export default HomeBottom;
