import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { Meteor } from 'meteor/meteor';
import Home from '../imports/ui/home.jsx';
import List from '../imports/ui/list.jsx';
import Admin from '../imports/ui/Admin.jsx';
import App from '../imports/ui/App.jsx';
import Account from '../imports/ui/Account.jsx';

FlowRouter.route('/', {
    name: 'Home',
    action() {
        mount(App, {
            main: <Home/>,
        });
    },
});

FlowRouter.route('/account/:_id',
{
    name: 'Account',
    action(params, queryParams) {
        Meteor.call('checkLogin',(error,result)=>{
            if(!result){
                FlowRouter.go('/') 
            } else {
                mount(App, {
                    main: <Account/>,
                });
            }
        })

    }
});
FlowRouter.route('/list', {
    name: 'List',
    action(params, queryParams) {
        mount(App, {
            main: <List/>,
        });
    },
});
FlowRouter.route('/admin', {
    name: 'Admin',
    action(params, queryParams) {
        mount(App, {
            main: <Admin/>,
        });
    },
});