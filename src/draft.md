- v0.0.1
# 1. Introduction
This specification defines the Trifle programming language and it's grammars.

## 1.1. Changes
As this is an alpha version of the Trifle specification, there are technically no changes made in this specification and it will be used as a base for future versions of the specification.

# 2. Data Types

## 2.0. Null
The Null type represents an arbitrary or undefined value.
```
<null> ::= "null"
```

## 2.1. Boolean
Booleans are literal tokens that represent `1` or `0`, `true` or `false`.
```
<boolean> ::= "true" | "false"
```

## 2.2. Number
The Number type represents a group of one or more digits.
```
<digit>  ::= { 0..9 }
<digits> ::= <digit> | <digits><digit>
```

### 2.2.1. Integer
An Integer has no floating point, which means it's just `<digits>`.

### 2.2.2. Float (Floating point integer)
The Float type has a floating point followed by another set of digits.
```
<decimal> ::= "."
<float>   ::= <digits><decimal><digits>
```

### 2.2.3. Grammar
The Number type could be represented by `<number>`.
```
<number> ::= <digits> | <float>
```

## 2.3. String
The String type is a sequence or group of one or more characters.
```
<string> ::= <Quote1><CharSet><Quote1> | <Quote2><CharSet><Quote2>
```

For example, a string might look like:
```trifle
"Hello, world!"
```

## 2.4. Object
An Object is a theoretical type that represents any value.  If a value's type is defined explicitly as `object`, it will accept any value.