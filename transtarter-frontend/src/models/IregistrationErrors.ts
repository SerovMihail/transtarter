export interface IregistrationErrors {
    DefaultError?: boolean
    ConcurrencyFailure?: boolean
    PasswordMismatch?: boolean
    InvalidToken?: boolean
    LoginAlreadyAssociated?: boolean
    InvalidUserName?: boolean
    InvalidEmail?: boolean
    DuplicateUserName?: boolean
    DuplicateEmail?: boolean
    InvalidRoleName?: boolean
    DuplicateRoleName?: boolean
    UserAlreadyHasPassword?: boolean
    UserLockoutNotEnabled?: boolean
    UserAlreadyInRole?: boolean
    UserNotInRole?: boolean
    PasswordTooShort?: boolean
    PasswordRequiresNonAlphanumeric?: boolean
    PasswordRequiresDigit?: boolean
    PasswordRequiresLower?: boolean
    PasswordRequiresUpper?: boolean
    PasswordError: boolean
    UserNameError: boolean
    [key: string]: any
}
