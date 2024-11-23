import React from 'react'
import { GoGoal } from "react-icons/go";
// import { FaUserGraduate } from "react-icons/fa6";
import { MdArrowBackIos } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaLinkedin } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { MdVideoSettings } from "react-icons/md";
import image from "../assets/students.jpg";
import image1 from "../assets/images.jpeg";
import image2 from "../assets/images (1).jpeg";
import { MdLocationPin } from "react-icons/md";
import { MdMailOutline } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa6";
import { ImYoutube } from "react-icons/im";
import { GrUserExpert } from "react-icons/gr";
import { FcGraduationCap } from "react-icons/fc";
import { FaUserGraduate } from "react-icons/fa6";

const About = () => {
  const instagram = () => {
    window.open("https://www.instagram.com/ugyan_edu?igsh=dmZibzQ5dWtqdWwz ", "_blank", "noopener,noreferrer");
  };

  const facebook = () => {
    window.open("https://www.linkedin.com/in/vaka-leela-krishna-0a71061a1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ", "_blank", "noopener,noreferrer");
  };
  const youtube = () => {
    window.open("https://youtube.com/@ugyanedutech?si=nZt5odO8SJB7Ffqx ", "_blank", "noopener,noreferrer");
  };
  
    const openLinkedInProfile1 = () => {
      window.open("https://www.linkedin.com/in/vaka-leela-krishna-0a71061a1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ", "_blank", "noopener,noreferrer");
    };
  
    const openLinkedInProfile2 = () => {
      window.open("https://www.linkedin.com/in/aswini-thakkellapati?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", "_blank", "noopener,noreferrer");
    };
  return (
    <div>
      <div className='background-about-page'>
        <Link to="/dashboard"><div className='back-to-home-about' ><MdArrowBackIos className='back-home-logo-about'/><h1>Home</h1></div></Link>
        <div className='heading-about'>
              <h1>Our Commitment</h1>
        </div>
        <div className='inner-div-about'>
          <div className='founders-about'>
            <div><h1>Meet the founders</h1></div>
            <div>
              <h2>Leela Krishna vaka</h2>
              <p>Co - founder & Managing director</p>
              <FaLinkedin className='linkedin-about' onClick={openLinkedInProfile1}/>
            </div>
            <div>
              <h2>Aswini Thakkellapati</h2>
              <p>Co-founder & CEO</p>
              <FaLinkedin className='linkedin-about' onClick={openLinkedInProfile2}/>
            </div>
          </div>
        </div>
        <div className='outer-div-about'>
          <div className='vision-div'>
            <div className='logo-vision-title'>
              <div><GoGoal /></div>
              <h1>Vision</h1>
            </div>
            <p className='vision-about'>At UGYAN Learning, our vision is to create a world where learning is celebrated, knowledge acquisition is limitless, nurturing talent is paramount, and excellence is the standard in every pursuit. We envision a community where individuals thrive through continuous growth and development, shaping a brighter future for generations to come.</p>
          </div>
          <div className='mission-div'>
            <div className='logo-vision-title'>
              <div><FaUserGraduate /></div>
              <h1>Mission</h1>
            </div>
            <p className='vision-about'>Our mission is to cultivate a dynamic learning ecosystem that empowers individuals to embark on a journey of discovery, acquisition, and mastery. Through innovative programs, personalized support, and collaborative partnerships, we strive to nurture talent, foster creativity, and inspire a lifelong passion for learning. We are committed to fostering an environment where excellence is not only encouraged but expected, enabling our ugyan community to reach new heights of personal and professional success</p>
          </div>
        </div>
        <div className='welcome-div-about'>
          <div className='photos-about'>
            <div><img src={image1} className='image-about'></img></div>
            <div><img src={image} className='image1-about'></img></div>
            <div><img src={image2} className='image2-about'></img></div>
          </div>
          <div className='welcome-paragraph'>
            <h1>Welcome to UGyan</h1>
            <p>UGyan is built on the foundation that knowledge is the key to boundless possibilities. By equipping yourself with knowledge, you gain the tools and understanding to break through barriers and reach your full potential. UGyan's motto, "Unlock Your Knowledge," reflects this belief. It's a powerful call to action, urging individuals to take charge of their learning journey and use knowledge as the springboard to achieving their dreams.</p>
            <div className='welcome-bottom-div-about'>
              <div>
              <GiBookshelf className='welcome-bottom-div-logo-about'/>
              <p>Industry Knowledge</p>
              </div>
              <div>
              <MdVideoSettings className='welcome-bottom-div-logo-about'/>
              <p>Online Course</p>
              </div>
            </div>
            <div className='welcome-bottom-div-about'>
              <div>
              <FaUserGraduate className='welcome-bottom-div-logo-about'/>
              <p>Internships and Real-Time Projects</p>
              </div>
              <div>
              <GrUserExpert  className='welcome-bottom-div-logo-about'/>
              <p>Learn from Experts</p>
              </div>
            </div>
          </div>
        </div>
        <div className='footer'>
          <div className='footer-about'>
            <div className='get-in-touch-about'>
              <h1>Get in Touch</h1>
              <div>
                <p><i>Get a free consultation with our awesome team.</i></p>
                <div className='location-about'><MdLocationPin className='location-logo-about'/> <p className='stay-connect'>Seetharampalya, Banglore , karnataka, 560048</p></div>
                <div className='location-about'><MdMailOutline className='location-logo-about'/> <p className='stay-connect'>Support@ugyan.in</p></div>
                <div className='location-about'><IoCall className='location-logo-about'/> <p className='stay-connect'>+91 79751 65470</p></div>
              </div>
            </div>
            <div className='resources-about'>
              <h1>Resources</h1>
              <div>Privacy Policy</div>
              <div>Refund and Return Policy</div>
            </div>
            <div className='quick-links-about'>
              <h1>Quick Links</h1>
              <div><Link to="/dashboard3">Home</Link></div>
              <div><Link to="https://ugyan.in/">Visit the official website of UGyan</Link></div>
              <div></div>
            </div>
            <div>
              <h1>Stay Connected </h1>
              <div  className='stay-connected-div-about'>
                <div onClick={instagram} className='location-about'><AiOutlineInstagram className='media-logo-about'/> <p className='stay-connect'>Instagram</p></div>
                <div onClick={youtube} className='location-about'><FaFacebook className='media-logo-about'/> <p className='stay-connect'>Facebook</p></div>
                <div onClick={facebook} className='location-about'><ImYoutube className='media-logo-about'/> <p className='stay-connect'>Youtube</p></div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
  )
}

export default About
