import React from 'react';
import DefaultLayout from '../layouts/default';
import Navigation from '../components/navigation';

export default class ProfileIndex extends React.Component {
    render() {
        return (
            <DefaultLayout title={this.props.title}>
                <h1>{this.props.title}</h1>
                <Navigation></Navigation>
                <table>
                    <thead>
                        <th>Name</th>
                        <th>Is Recurring</th>
                    </thead>
                </table>
            </DefaultLayout>
        );
    }
}