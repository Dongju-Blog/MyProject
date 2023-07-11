

//    @Transactional(readOnly = true)
//    public Map<String, String> signUpUsernameValidation(Errors errors, SignUpUsernameValidationDto requestDto) {
//        Map<String, String> validatorResult = new HashMap<>();
//
//        Optional<User> userByUsername = userRepository.findByUsername(requestDto.getUsername());
//        if (userByUsername.isPresent()) {
//            errors.rejectValue("username", "DUPLICATE_USERNAME", "DUPLICATE_USERNAME");
//        }
//
//        if (!validatorResult.isEmpty()) {
//            return validatorResult;
//        }
//
//        for (FieldError error : errors.getFieldErrors()) {
//            String validKeyName = String.format(error.getField());
//            String errorName = ErrorCode.valueOfIgnoreCase(error.getDefaultMessage()).getMessage();
//            validatorResult.put(validKeyName, errorName);
//        }
//        return validatorResult;
//    }
//
//
//    // 회원가입 시, 유효성 체크
//    @Transactional(readOnly = true)
//    public Map<String, String> validateHandling(Errors errors, SignUpDto requestDto) {
//    Map<String, String> validatorResult = new HashMap<>();
//
//    if (!requestDto.getPassword().equals(requestDto.getCheckedPassword())) {
//        errors.rejectValue("checkedPassword", "INVALID_CHECKED_PASSWORD", "INVALID_CHECKED_PASSWORD");
//    }
//
//    Optional<User> userByUsername = userRepository.findByUsername(requestDto.getUsername());
//    if (userByUsername.isPresent()) {
//        errors.rejectValue("username", "DUPLICATE_USERNAME", "DUPLICATE_USERNAME");
//    }
//
//    Optional<User> userByEmail = userRepository.findByEmail(requestDto.getUsername());
//    if (userByEmail.isPresent()) {
//        errors.rejectValue("email", "DUPLICATE_EMAIL", "DUPLICATE_EMAIL");
//    }
//
//    // 유효성 검사에 실패한 필드 목록을 받음
//    for (FieldError error : errors.getFieldErrors()) {
//        String validKeyName = String.format(error.getField());
//        String errorName = ErrorCode.valueOfIgnoreCase(error.getDefaultMessage()).getMessage();
//        validatorResult.put(validKeyName, errorName);
//    }
//        return validatorResult;
//    }

