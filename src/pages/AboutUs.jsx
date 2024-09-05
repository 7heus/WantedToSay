import "./AboutUs.css";
import GitHubImg from "../assets/GitHub.png";
import LinkedInLogo from "../assets/LinkedInLogo.png"

export default function AboutUs() {
  return (
    <div className="AboutPage">
      <h1 className="AboutUs">Developing Team</h1>
      <div className="Info">
        <div className="">
          <img
            src="https://ca.slack-edge.com/T01BAR6KJP4-U07866FMMUP-aa8a59213dcb-512"
            alt="Carlos Carvalho Profile Pic"
            className="CarlosPic"
          />
          <h2 className="">Carlos Carvalho</h2>
          <p className=""></p>
          <a href="https://github.com/CarlosCwebdev"><img className="GitHubImg" src={GitHubImg} alt="GitHubProfile" /></a><br/><br/>
          <a href="https://www.linkedin.com/in/-carlos-carvalho-/"><img className="LinkedInLogo" src={LinkedInLogo} alt="LinkedIn profile"/></a>
        </div>
        <div className="">
          <img
            src="https://media.licdn.com/dms/image/v2/D4D03AQECHw8p93DADw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725363237079?e=1730937600&v=beta&t=ELzaSZjhMaKR2MEG7MFyAxe6VtaDwaqX3pej-7X6qOM"
            alt="Prashidhika Neupane Pic"
            className="PrashidhikaPic"
          />
          <h2 className="">Prashidhika Neupane</h2>
          <p className=""></p>
          <a href="https://github.com/Prashidhika/"><img className="GitHubImg" src={GitHubImg} alt="GitHubProfile"/></a><br/><br/>
          <a href="https://www.linkedin.com/in/prashidhika-neupane-0a83a8216/"><img className="LinkedInLogo" src={LinkedInLogo} alt="LinkedIn profile"/></a>
        </div>
        <div className="">
          <img
            src="https://ca.slack-edge.com/T01BAR6KJP4-U078P7JPCSY-a9155ad40165-512"
            alt="Matheus Almeida Profile Pic"
            className="MateusPic"
          />
          <h2 className="">Matheus Almeida</h2>
          <p className=""></p>
          <a href="https://github.com/7heus"><img className="GitHubImg" src={GitHubImg} alt="GitHubProfile"/></a><br/><br/>
          <a href=""><img className="LinkedInLogo" src={LinkedInLogo} alt="LinkedIn profile"/></a>
        </div>
      </div>
    </div>
  );
}