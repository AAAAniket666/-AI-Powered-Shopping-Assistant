import React from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const FormikEx = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(8, 'Too short').required('Required'),
      })}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <View style={{ padding: 20 }}>
          <TextInput
            onChangeText={handleChange('email')}
            value={values.email}
            placeholder='Email'
          />
          {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}    
          <TextInput
            onChangeText={handleChange('password')}
            value={values.password}
            placeholder='Password'
            secureTextEntry
          />
          {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
          
          <Button onPress={() => handleSubmit()} title='Submit' />
        </View>
      )}
    </Formik>
  );
};

export default FormikEx;