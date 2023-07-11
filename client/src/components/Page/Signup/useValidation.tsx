import { signupType, signupProcType, signupValidType } from '@/types/auth'
import { debounce } from 'lodash'
import React, {useState, useEffect} from 'react'




function useValidation(inputState: signupType) {
  const [isValid, setIsValid] = useState<signupValidType>({
    name: true,
    username: true,
    password: true,
    checkedPassword: true,
    email: true
  })
  const [validMessage, setValidMessage] = useState<signupProcType>({
    name: '',
    username: '',
    password: '',
    checkedPassword: '',
    email: ''
  })

  const nameExp: RegExp = /^[가-힣]{2,10}$/
  const usernameExp: RegExp = /^[a-z0-9]{4,20}$/
  const passwordExp: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/
  const emailExp: RegExp = /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+$/

  const validHandler = (type: string, isValid: boolean, message: string) => {
    setValidMessage((prev) => {return {...prev, [type]: message}})
		setIsValid((prev) => {return {...prev, [type]: isValid}})
  }

  const validInjector = (messages: signupProcType) => {
    const keys = Object.keys(messages) as Array<keyof signupProcType>
    keys.forEach((key) => {
      if (messages[key] === '') {
        setIsValid((prev) => {return {...prev, [key]: true}})
      } else {
        setIsValid((prev) => {return {...prev, [key]: false}})
      }
    })
    setValidMessage((prev) => {return {...prev, ...messages}})
  }

  useEffect(() => {
    const debouncedHandler = debounce(() => {
      validNameHandler()
    }, 1000);
    
    debouncedHandler();

    return () => {
      debouncedHandler.cancel();
    };
    
  }, [inputState.name])

  useEffect(() => {
    const debouncedHandler = debounce(() => {
      validUsernameHandler()
    }, 1000);
    
    debouncedHandler();

    return () => {
      debouncedHandler.cancel();
    };
    
  }, [inputState.username])

  useEffect(() => {
    const debouncedHandler = debounce(() => {
      validPasswordHandler()
    }, 1000);
    
    debouncedHandler();

    return () => {
      debouncedHandler.cancel();
    };
    
  }, [inputState.password])

  useEffect(() => {
    const debouncedHandler = debounce(() => {
      validCheckedPasswordHandler()
    }, 1000);
    
    debouncedHandler();

    return () => {
      debouncedHandler.cancel();
    };
    
  }, [inputState.checkedPassword])

  useEffect(() => {
    const debouncedHandler = debounce(() => {
      validEmailHandler()
    }, 1000);
    
    debouncedHandler();

    return () => {
      debouncedHandler.cancel();
    };
    
  }, [inputState.email])

  const validNameHandler = () => {
    if (inputState.name === '') {
      return
    }
		// 유효하지 않을 때
		if (nameExp.test(inputState.name) === false) {
      validHandler('name', false, "이름은 한글만 사용하여 2~10자리여야 합니다.")
			return
		}
		// 사용가능하다면
    validHandler('name', true, "")
	}

  const validUsernameHandler = () => {
    if (inputState.username === '') {
      return
    }
		// 유효하지 않을 때
		if (usernameExp.test(inputState.username) === false) {
      validHandler('username', false, "아이디는 영어 소문자와 숫자만 사용하여 4~20자리여야 합니다.")
			return
		}
		// 사용가능하다면
		validHandler('username', true, "")
	}

  const validPasswordHandler = () => {
    if (inputState.password === '') {
      return
    }
		// 유효하지 않을 때
		if (passwordExp.test(inputState.password) === false) {
      validHandler('password', false, "비밀번호는 8~16자리수여야 합니다. 영문 대소문자, 숫자, 특수문자를 1개 이상 포함해야 합니다.")
			return
		}
		// 사용가능하다면
		validHandler('password', true, "")
	}

  const validCheckedPasswordHandler = () => {
    if (inputState.checkedPassword === '') {
      return
    }
		// 유효하지 않을 때
		if (inputState.checkedPassword !== inputState.password) {
      validHandler('checkedPassword', false, "비밀번호와 비밀번호 확인이 일치하지 않습니다.")
			return
		}
		// 사용가능하다면
		validHandler('checkedPassword', true, "")
	}

  const validEmailHandler = () => {
    if (inputState.email === '') {
      return
    }
		// 유효하지 않을 때
		if (emailExp.test(inputState.email) === false) {
      validHandler('email', false, "이메일 형식이 옳바르지 않습니다.")
			return
		}
		// 사용가능하다면
		validHandler('email', true, "")
	}

  return {isValid, validMessage, validInjector}
}

export default useValidation