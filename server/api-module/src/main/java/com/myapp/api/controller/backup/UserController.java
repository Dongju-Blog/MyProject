//
//
//    @PostMapping("/signup/username_validation")
//    @Authorize({Role.GUEST})
//    public ResponseEntity<?> signUpUsernameValidation(@Valid @RequestBody SignUpUsernameValidationDto requestDto, Errors errors, Model model) {
//        Map<String, String> validatorResult = userService.signUpUsernameValidation(errors, requestDto);
//
//        if (!validatorResult.isEmpty()) {
//            model.addAttribute("userDto", requestDto);
//            for (String key : validatorResult.keySet()) {
//                model.addAttribute(key, validatorResult.get(key));
//            }
//            return new ResponseEntity<>(validatorResult, HttpStatus.OK);
//        }
//
//        return ResponseEntity.ok(HttpStatus.OK);
//    }
//
//    @PostMapping("/signup_proc")
//    @Authorize({Role.GUEST})
//    public ResponseEntity<?> signUpProc(@Valid @RequestBody SignUpDto requestDto, Errors errors, Model model) {
//        Map<String, String> validatorResult = userService.validateHandling(errors, requestDto);
//
//        if (!validatorResult.isEmpty()) {
//            model.addAttribute("userDto", requestDto);
//
//
//            for (String key : validatorResult.keySet()) {
//                model.addAttribute(key, validatorResult.get(key));
//            }
//
//            return new ResponseEntity<>(validatorResult, HttpStatus.OK);
//        }
//        return ResponseEntity.ok(HttpStatus.OK);
//    }
//
//