import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import "~/css/main.scss"

import CountDownTimer from "./projects/CountDownTimer"
import ImageEffects from "./projects/ImageEffects"

const navLinks = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/countdowntimer",
    name: "Count Down Timer",
  },
  {
    path: "/imageeffects",
    name: "Image Effects",
  },
]

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <div className="w-1/4 border-r border-yellow-300">
          {navLinks.map(({ path, name }) => {
            return (
              <Link key={path} to={path} className="block">
                {name}
              </Link>
            )
          })}
        </div>
        <div className="w-3/4 flex justify-center items-center">
          <Switch>
            <Route exact path="/" render={() => <div>Welcome</div>} />
            <Route exact path="/countdowntimer" component={CountDownTimer} />
            <Route exact path="/imageeffects" component={ImageEffects} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
