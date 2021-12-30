import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const Page = forwardRef(({ children, title = '', ...rest }, ref) => (
  <div ref={ref} {...rest}>
    <Helmet htmlAttributes={{ lang: localStorage.getItem('locale') || 'en' }}>
      <title>{title}</title>
    </Helmet>
    {children}
  </div>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

Page.defaultProps = {
  title: '',
};

export default Page;
