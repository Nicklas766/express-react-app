/*eslint-disable no-unused-vars*/

// Mocha
import mocha from 'mocha';
import { describe, it } from 'mocha';

// Enzyme
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import { shallow, mount } from 'enzyme';

// React
import React from 'react';
import Home from '../../client/app/compontents/page/Home.js';
/*eslint-enable no-unused-vars*/

var assert = require('assert');

// console.log(wrapper.debug());

describe('<Home />', () => {
    it('renders h1', () => {
        const wrapper = shallow(<Home />);

        assert(wrapper.find('h1').text() == 'Hello World!');
    });
});
