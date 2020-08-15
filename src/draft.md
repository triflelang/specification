- v0.0.1
# 1. Introduction
This specification defines the Trifle programming language and it's grammars.

## 1.1. Changes
As this is an alpha version of the Trifle specification, there are technically no changes made in this specification and it will be used as a base for future versions of the specification.

# 2. BNF Notation
This specification uses an augmented version of the BNF grammar notation.

## 2.1. `<CharSet>`
The Unicode charset. (Including UTF-8, UTF-16, and UTF-32)

# 3. Data Types

## 3.0. Null
The Null type represents an arbitrary or undefined value.
```
<null> ::= "null"
```

## 3.1. Boolean
Booleans are literal tokens that represent `1` or `0`, `true` or `false`.
```
<boolean> ::= "true" | "false"
```

## 3.2. Number
The Number type represents a group of one or more digits.
```
<digit>  ::= { 0..9 }
<digits> ::= <digit> | <digits><digit>
```

### 3.2.1. Integer
An Integer has no floating point, which means it's just `<digits>`.

### 3.2.2. Float (Floating point integer)
The Float type has a floating point followed by another set of digits.
```
<decimal> ::= "."
<float>   ::= <digits><decimal><digits>
```

### 3.2.3. Grammar
The Number type could be represented by `<number>`.
```
<number> ::= <digits> | <float>
```

## 3.3. String
The String type is a sequence or group of one or more characters.
```
<quote1>   ::= "\""
<quite3>   ::= "'"

<charset1> ::= <CharSet> - <quote1> | "\\\""
<charset3> ::= <CharSet> - <quote3> | "\\'"

<chars1>   ::= <charset1> | <chars1><charset1>
<chars3>   ::= <charset3> | <chars3><charset3>

<empty1>   ::= <quote1><quote1>
<empty3>   ::= <quote3><quote3>

<string1>  ::= <empty1> | <quote1><chars1><quote1>
<string3>  ::= <empty3> | <quote3><chars3><quote3>

<string>   ::= <string1> | <string3>
```

For example, a string might look like:
```trifle
"Hello, world!"
```

## 3.4. Object
An Object is a theoretical type that represents any value.  If a value's type is defined explicitly as `object`, it will accept any value.