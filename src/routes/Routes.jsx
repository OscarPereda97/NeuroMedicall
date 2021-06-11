import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Panel from '../pages/Panel'

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route path="/panel" component={Panel}></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router