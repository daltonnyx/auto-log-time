import React from 'react';
import DefaultLayout from '../layouts/default';
import Navigation from '../components/navigation';

export default class HomeIndex extends React.Component {
    render() {
        return (
            <DefaultLayout title={this.props.title}>
                <h1>{this.props.title}</h1>
                <Navigation></Navigation>
            </DefaultLayout>
        );
    }
}