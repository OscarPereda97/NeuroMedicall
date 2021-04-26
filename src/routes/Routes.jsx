import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from '../pages/Login'
import PanelDashboard from '../pages/PanelDashboard'

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route exact path="/panel" component={PanelDashboard}></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router