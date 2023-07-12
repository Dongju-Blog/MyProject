package com.myapp.core.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Status {
    APPROVED("STATUS_APPROVED");
    private final String description;
}
