# :gear: `setup-terraform-backend-git` ![](https://github.com/plumber-cd/setup-terraform-backend-git/workflows/Tests/badge.svg)
> This action can be used to setup `terraform-backend-git` to be used by subsequent steps.

## About

See https://github.com/plumber-cd/terraform-backend-git.

## Usage

```yaml
steps:
- uses: plumber-cd/setup-terraform-backend-git@v1
  with:
    version:
      0.1.2
```

## Inputs
The actions supports the following inputs:

- `version`: The version of `terraform-backend-git` to install
