import {css} from 'styled-components'

export interface SpacingsProps {
  padding?: number
  paddingVertical?: number
  paddingHorizontal?: number
  paddingTop?: number
  paddingBottom?: number
  paddingLeft?: number
  paddingRight?: number
  margin?: number
  marginVertical?: number
  marginHorizontal?: number
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
}

const spacingProp = (name: keyof SpacingsProps, props: SpacingsProps) =>
  props[name] ? `${name}: ${props[name]}px;` : ''
export const spacings = (props: SpacingsProps) => css`
  ${spacingProp('padding', props)}
  ${spacingProp('paddingVertical', props)}
  ${spacingProp('paddingHorizontal', props)}
  ${spacingProp('paddingTop', props)}
  ${spacingProp('paddingBottom', props)}
  ${spacingProp('paddingLeft', props)}
  ${spacingProp('paddingRight', props)}
  ${spacingProp('margin', props)}
  ${spacingProp('marginVertical', props)}
  ${spacingProp('marginHorizontal', props)}
  ${spacingProp('marginTop', props)}
  ${spacingProp('marginBottom', props)}
  ${spacingProp('marginLeft', props)}
  ${spacingProp('marginRight', props)}
`
