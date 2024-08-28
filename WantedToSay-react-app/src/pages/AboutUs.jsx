import "./AboutUs.css";
import GitHubImg from "../assets/GitHub.png";

export default function AboutUs() {
  return (
    <div className="AboutPage">
      <h1 className="AboutUs">About Us</h1>
      <div className="Info">
        <div className="">
          <img
            src="https://ca.slack-edge.com/T01BAR6KJP4-U07866FMMUP-aa8a59213dcb-512"
            alt="Carlos Carvalho Profile Pic"
            className="CarlosPic"
          />
          <h2 className="">Carlos Carvalho</h2>
          <p className=""></p>
          <a href="https://github.com/CarlosCwebdev"><img className="GitHubImg" src={GitHubImg} alt="GitHubProfile"/></a>
        </div>
        <div className="">
          <img
            src="https://ca.slack-edge.com/T01BAR6KJP4-U078V9HKAVA-g13f63e4c01b-512"
            alt="Prashidhika Neupane Pic"
            className="PrashidhikaPic"
          />
          <h2 className="">Prashidhika Neupane</h2>
          <p className=""></p>
          <a href="https://github.com/Prashidhika/"><img className="GitHubImg" src={GitHubImg} alt="GitHubProfile"/></a>
        </div>
        <div className="">
          <img
            src="https://ca.slack-edge.com/T01BAR6KJP4-U078P7JPCSY-a9155ad40165-512"
            alt="Matheus Almeida Profile Pic"
            className="MateusPic"
          />
          <h2 className="">Matheus Almeida</h2>
          <p className=""></p>
          <a href="https://github.com/7heus"><img className="GitHubImg" src={GitHubImg} alt="GitHubProfile"/></a>
        </div>
      </div>
      <div className="">
        <h2 className="aboutProject">Information about the project</h2>
        <p className=""></p>
      </div>
    </div>
  );
}