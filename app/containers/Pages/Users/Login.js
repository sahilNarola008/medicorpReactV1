import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import brand from 'dan-api/dummy/brand'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { LoginForm } from 'dan-components'
import styles from 'dan-components/Forms/user-jss'

import { appSettings, useAxios, useLocalStorage } from "@medicorp"
import { useHistory } from "react-router-dom"

function Login(props) {
  const { endpointConfig } = appSettings
  const{setAppItem} = useLocalStorage()
  const [valueForm, setValueForm] = useState(null)

  const history = useHistory();
  const [{ }, authData] = useAxios(
    {
      url: endpointConfig.authentication.authentication,
      method: "POST"
    },
    { manual: true })
  const submitForm = values => {
    console.log(values);
    setTimeout(() => {
      authData({
        data: {
          userName: values.email,
          password: values.password,
          fcmToken: "",
          organizationId: 1
        }
      }).then((res) => {
        console.log(res);
        // const useDetails = parseJwt(res.data)
        setAppItem("token", res.data)
        history.push('/app/pages/dashboard')
      }).catch((error) => {
        console.log(error)
      })
      setValueForm(values);
    }, 500); // simulate server latency
  };

  const title = brand.name + ' - Login';
  const description = brand.desc;
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.container}>
        <div className={classes.userFormWrap}>
          <LoginForm onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
