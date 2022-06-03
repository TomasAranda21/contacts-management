import Input from '../Input'

  const InputName = ({handleChange, value, touched}) => {
      return (
        <Input 
            type="text"
            name="name"
            text="name"
            placeholder="You Name"
            onChange={handleChange}
            value= {value}
            touched={touched}
        />
    
      )
    }


    const InputEmail = ({handleChange, values, touched}) => {
        return (
          <Input 
              type="email"
              name="email"
              text="email"
              placeholder="You Email"
              onChange={handleChange}
              value= {values}
              touched={touched}

          />
        )
    }
  
    
    const InputPassword = ({handleChange, value, touched}) => {
      return (

        <Input 
            type="password"
            name="password"
            text="password"
            placeholder="You Password"
            onChange={handleChange}
            value= {value}
            touched={touched}

        />
      )

    }


export {InputPassword, InputName, InputEmail}