import logo from './logo.svg';
import './App.css';
import MainScreen from "./Components/Collection/MainScreen";
import Menu, {Tree} from "./Components/Collection/Menu";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import {Container} from "./Components/Collection/menuStyles";
import DotGrid from "./Components/About/DotGrid";
import Paint from "./Components/About/Paint";
import Keyboard from "./Components/About/Keyboard";

function MainMenu() {
  return (
      <div className={'mainMenu'} style={{background: 'white'}}>
          <div style={{position: 'absolute', top: '25vh', fontSize: '28px'}}><b>Welcome to Ro Catalog</b></div>
      <Container>
          <Tree name="Home" defaultOpen={true}>
            <Tree name="Collections" >
              <Tree name="Skate" link={'/skate'} style={{ color: '#37ceff' }}/>
              <Tree name="Photography: Coming Soon!" style={{ color: 'rgba(55,206,255,0.5)' }} />
              <Tree name="Tattoo : Coming Soon!" style={{ color: 'rgba(55,206,255,0.5)' }} />
            </Tree>
              <Tree name="About" link={'/about'} style={{ color: '#37ceff' }}/>

      </Tree>
      </Container>
      </div>
  )
}

const About = () => {



    const cont = "Ro Catalog sketches the future of online shopping using fashion as its medium. Its purpose is to provide customers with context about clothing through its distinct browsing experience. The fit and flow of\n" +
        "fashion cannot be articulated through a single image with a blank background. \n" +
        "\n" +
        "It requires real moments captured in real space at real time. Ro Catalog’s novel extension of video not only depicts clothing in a true light but also expands its context further into clothing culture. Every customer belongs to a subculture and each subculture has its own fashion tastes. With Ro Catalog, customers can discover new trends in their fashion subculture or explore others with ease. \n"
    const dotCont = "The first step in creating interactive assets is finding out the interaction zones of those assets. For images, it involves keeping the location of the outer boundaries of the area you want selectable. For videos, it is the same as for images but for each frame of the video."
    const paintCont = "The next step is making the now interactive areas look like they are interactive. This can be accomplished in a variety of ways, but the method shown in this site overlays illustrations with clear backgrounds over the existing assets."
    const keyboardCont = "The last step is putting together the previous two steps. With the interaction areas in a video(or image) at each frame as well the designs complete, a software developer is able to create interactivity that displays the designs when the associated zone is hovered or clicked on."


    return <div>
            <div style={{color: 'white', position: 'absolute', left: '15vw', top: '15vh', fontSize: '30px', width: '400px'}}>About</div>
            <div style={{color: 'white', position: 'absolute', left: '5vw', top: '30vh', fontSize: '15px', width: '400px'}}>

                <div>{cont}</div>
            </div>


        <div>
            <div style={{color: 'white', position: 'absolute', right: '29vw', top: '15vh', fontSize: '30px'}}>
                <div>How it Works</div>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '30px', position: 'absolute', top: '30vh', right: '3vw'}}>
                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <div style={{marginRight: '20px', border: '1px solid #37ceff'}}>
                        <DotGrid />
                    </div>
                    <div style={{color: 'white', marginTop: '30px', width: '250px'}}>{dotCont}</div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', zIndex: 10}}>
                    <div style={{marginRight: '20px',border: '1px solid #ffee37'}}>
                        <Paint />
                    </div>
                    <div style={{color: 'white', marginTop: '30px', width: '250px'}}>{paintCont}</div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <div style={{border:'1px solid #ff375c'}}>
                        <Keyboard />
                    </div>
                    <div style={{color: 'white',  marginTop: '30px', width: '250px'}}>{keyboardCont}</div>
                </div>
            </div>


            <div style={{fontSize: '16px' ,position: 'absolute', top: '10px', 'right': '30px', display: 'flex', color: 'white', width:'100px', justifyContent: 'space-between'}}>
                <Link style={{textDecoration: 'none'}} to={'/'}><b>Home</b></Link>
                <Link style={{textDecoration: 'none'}} to={'/skate'}><b>Skate</b></Link>

            </div>
        </div>
    </div>


}

function App() {
  return (
      <main>
          <Routes>
              <Route path="/" element={<MainMenu/>} exact />
              <Route path="/skate" element={<MainScreen />} />
              <Route path="/about" element={<About/>} />
          </Routes>
      </main>


      // <Menu />

    // <MainScreen />
  );
}

export default App;
