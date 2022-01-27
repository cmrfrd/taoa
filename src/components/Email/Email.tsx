// https://taoa.us14.list-manage.com/subscribe/post?u=c19df6a5ff3e4090cf5dbc996&amp;id=6661b00e2c

import React, { useState } from 'react';
import { Input } from 'theme-ui';
import { Button, MediumButton } from '@components/Button';
import styled from '@emotion/styled';
import { ITAOAThemeUIContext } from '@types';
import * as EmailValidator from 'email-validator';
import mediaqueries, { mediaquery } from '@styles/media';

import jsonp from 'jsonp';
import PropTypes from 'prop-types';

class Mailchimp extends React.Component {
  state = {};

  handleSubmit(evt) {
    evt.preventDefault();
    const { fields, action } = this.props;
    const values = fields
      .map(field => {
        return `${field.name}=${encodeURIComponent(this.state[field.name])}`;
      })
      .join('&');
    const path = `${action}&${values}`;
    const url = path.replace('/post?', '/post-json?');
    const email = this.state['EMAIL'];

    setTimeout(() => {
      this.setState({ status: null });
    }, 2000);

    !EmailValidator.validate(email) ? this.setState({ status: 'empty' }) : this.sendData(url);
  }

  sendData(url) {
    this.setState({ status: 'sending' });
    jsonp(url, { param: 'c' }, (err, data) => {
      if (data.msg.includes('already subscribed')) {
        this.setState({ status: 'duplicate' });
      } else if (err) {
        this.setState({ status: 'error' });
      } else if (data.result !== 'success') {
        this.setState({ status: 'error' });
      } else {
        this.setState({ status: 'success' });
      }
    });
  }

  render() {
    const { fields, styles, className, buttonClassName } = this.props;
    const messages = {
      ...Mailchimp.defaultProps.messages,
      ...this.props.messages
    };
    const { status } = this.state;
    const input = fields[0];
    return (
      <form autoComplete="off" onSubmit={this.handleSubmit.bind(this)} className={className}>
        <EmailContainer>
          <EmailInput
            {...input}
            key={input.name}
            onChange={({ target }) => this.setState({ [input.name]: target.value })}
            defaultValue={this.state[input.name]}
          />
          <HSpacer />
          <Wrapper>
            <SubscribeButton
              theme={{ height: '54px' }}
              text="Subscribe"
              type="submit"
              className={buttonClassName}
            />
            <ToolTip isDark={true} hasCopied={status}>
              {status == 'success' && 'Thank you for subscribing!'}
              {status == 'empty' && 'Please write a valid Email'}
              {status == 'duplicate' && 'Thank you for subscribing!'}
              {status == 'error' && "Uh oh, couldn't process!"}
            </ToolTip>
          </Wrapper>
        </EmailContainer>
      </form>
    );
  }
}

Mailchimp.defaultProps = {
  messages: {
    sending: 'Sending...',
    success: 'Thank you for subscribing!',
    error: 'An unexpected internal error has occurred.',
    empty: 'You must write an e-mail.',
    duplicate: 'Too many subscribe attempts for this email address',
    button: 'Subscribe!'
  },
  buttonClassName: '',
  styles: {
    sendingMsg: {
      color: '#0652DD'
    },
    successMsg: {
      color: '#009432'
    },
    duplicateMsg: {
      color: '#EE5A24'
    },
    errorMsg: {
      color: '#ED4C67'
    }
  }
};

Mailchimp.propTypes = {
  action: PropTypes.string,
  messages: PropTypes.object,
  fields: PropTypes.array,
  styles: PropTypes.object,
  className: PropTypes.string,
  buttonClassName: PropTypes.string
};

const Email: React.FC = ({}) => {
  return (
    <div>
      <Mailchimp
        action="https://taoa.us14.list-manage.com/subscribe/post?u=c19df6a5ff3e4090cf5dbc996&amp;id=6661b00e2c"
        fields={[
          {
            name: 'EMAIL',
            placeholder: 'Email',
            type: 'email',
            required: true
          }
        ]}
      />
    </div>
  );
};

export default Email;

const EmailContainer = styled.div({
  paddingTop: '10px',
  paddingBottom: '10px',
  display: 'flex'
});

interface IToolTip extends ITAOAThemeUIContext {
  isDark: boolean;
  hasCopied: boolean;
}

const ToolTip = styled.span((p: IToolTip) => ({
  padding: '3px 10px',
  position: 'absolute',
  background: p.isDark ? '#000' : p.theme.colors.background,
  color: p.isDark ? '#fff' : '#000',
  borderRadius: '3px',
  fontSize: '10px',
  top: '-40px',
  opacity: p.hasCopied ? 1 : 0,
  transform: p.hasCopied ? 'translateY(-3px)' : 'none',
  transition: p.theme.colorModeTransition,
  zIndex: 100,

  '&::after': {
    position: 'absolute',
    content: "''",
    left: 0,
    right: 0,
    bottom: '-6px',
    margin: '0 auto',
    width: 0,
    height: 0,
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderTop: `6px solid ${p.isDark ? '#000' : p.theme.colors.background}`,
    transition: p.theme.colorModeTransition
  }
}));

const EmailInput = styled(Input)((p: ITAOAThemeUIContext) => ({
  width: '300px',
  fontSize: '18px',
  '[type="text"]': { fontSize: '18px' },
  backgroundColor: '#fff',
  borderRadius: '2px',
  borderColor: `p.theme.colors.invPrimary`,
  '&:focus': {
    borderColor: 'primary',
    boxShadow: `0 0 0 2px ${p.theme.colors.secondary}`,
    outline: 'none'
  }
}));

const SubscribeButton = styled(MediumButton)((p: ITAOAThemeUIContext) => ({}));

const HSpacer = styled.div({
  width: '5px'
});

const Wrapper = styled.div((p: ITAOAThemeUIContext) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));
