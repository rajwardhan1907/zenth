export type OnboardingStep = {
  id: string
  number: number
  title: string
  subtitle: string
  component: string
}

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 'account',
    number: 1,
    title: 'Create your account',
    subtitle: 'Tell us who you are',
    component: 'Step1Account',
  },
  {
    id: 'product',
    number: 2,
    title: 'Describe your product',
    subtitle: 'Help the agent understand your business',
    component: 'Step2Product',
  },
  {
    id: 'connect',
    number: 3,
    title: 'Connect your site',
    subtitle: 'Link your website and GSC',
    component: 'Step3Connect',
  },
  {
    id: 'preferences',
    number: 4,
    title: 'Set preferences',
    subtitle: 'Tune the agent to your style',
    component: 'Step4Preferences',
  },
]
