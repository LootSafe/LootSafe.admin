import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';
import NewItem from '../../views/NewItem/';
import ListItems from '../../views/ListItems/';
import DistributeItem from '../../views/DistributeItem/';
import UpdateLootboxChances from '../../views/UpdateLootboxChances/';
import AddToLootTable from '../../views/AddToLootTable/';
import UpdateBoxCost from '../../views/UpdateBoxCost/';
import LootBoxItems from '../../views/LootBoxItems/';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/item/new" name="New Item" component={NewItem}/>
                <Route path="/item/list" name="List Items" component={ListItems}/>
                <Route path="/item/spawn" name="Distribute Item" component={DistributeItem}/>
                <Route path="/lootbox/chances" name="Update Lootbox Chances" component={UpdateLootboxChances}/>
                <Route path="/lootbox/new" name="Add Lootbox Item" component={AddToLootTable}/>
                <Route path="/lootbox/cost" name="Update Lootbox Cost" component={UpdateBoxCost}/>
                <Route path="/lootbox/items" name="Lootbox Items" component={LootBoxItems}/>
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
