import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Switch, useLocation } from "react-router-dom";
import Page from "./Page";
import "./Transition.css";

const irene =
  "https://raw.githubusercontent.com/baeharam/Redvelvet-Fansite/master/images/about-irene.jpg";
const seulgi =
  "https://raw.githubusercontent.com/baeharam/Redvelvet-Fansite/master/images/about-seulgi.jpg";
const yeri =
  "https://raw.githubusercontent.com/baeharam/Redvelvet-Fansite/master/images/about-yeri.jpg";
const joy =
  "https://raw.githubusercontent.com/baeharam/Redvelvet-Fansite/master/images/about-joy.jpg";
const wendy =
  "https://raw.githubusercontent.com/baeharam/Redvelvet-Fansite/master/images/about-wendy.jpg";

const Transition = () => {
  const PageIrene = <Page image={irene} />;
  const PageSeulgi = <Page image={seulgi} />;
  const PageYeri = <Page image={yeri} />;
  const PageJoy = <Page image={joy} />;
  const PageWendy = <Page image={wendy} />;

  const location = useLocation();

  return (
    <TransitionGroup className="transition-group">
      <CSSTransition key={location.pathname} classNames="fade" timeout={500}>
        <Switch location={location}>
          <Route exact path="/" children={PageIrene} />
          <Route path="/seulgi" children={PageSeulgi} />
          <Route path="/yeri" children={PageYeri} />
          <Route path="/joy" children={PageJoy} />
          <Route path="/wendy" children={PageWendy} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Transition;