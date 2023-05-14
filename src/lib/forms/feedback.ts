import { FormItemType, type Form } from '$lib/types';

export const feedback: Form = {
  title: 'Resident Feedback',
  description: `We want to hear from you! Who left a positive impact of your experience at Zuzalu? Who would you,or wouldn't you, like to see back at Zuzalu 2.0?

    This form is for praising or providing constructive feedback to existing residents, this should not be used to recommend new residents. 
    
    Your responses will be critical in helping us make hard decisions of who we want back in our community. Therefore we encourage descriptive responses, specifically the use of adjectives and storytelling to provide a rich and nuanced understanding of your experiences and perceptions.
    
    Peace of Mind Notes: 
    - Your responses will never be shown to the public, your name and submission is only seen by the admin team. 
    - If you would like to opt out of being included, you may do so and we will be feedback blind in evaluating you for Zuzalu 2.0
    `,
  formItems: [
    {
      name: 'Your Name',
      columnName: 'name',
      type: FormItemType.string
    },
    {
      name: 'Your Telegram Handle',
      columnName: 'writerTelegramHandle',
      description:
        'If you do not have a telegram, please write another unique identifier',
      type: FormItemType.string
    },
    {
      name: 'Who are you writing this feedback about?',
      columnName: 'feedbackName',
      type: FormItemType.string,
      required: true,
      description:
        'Please list an existing resident, if you are trying to refer a new person, please fill out the other form.'
    },
    {
      name: 'What is their Telegram Handle?',
      columnName: 'feedbackPersonTelegramHandle',
      type: FormItemType.string,
      required: true,
      description:
        'If they do not have telegram, please provide an alternate unique identifier.'
    },
    {
      name: 'In ways has this person left a positive impact on Zuzalu?',
      columnName: 'positiveImpact',
      type: FormItemType.text
    },
    {
      name: "What is one example of a positive interaction you've had, or seen this person have with another?",
      columnName: 'positiveExample',
      description:
        'This could extend from having had deep and meaningful conversations, to this person teaching you how to implement Nova.',
      type: FormItemType.text
    },
    {
      name: 'How has this resident influenced your personal experience at Zuzalu?',
      columnName: 'residentInfluence',
      type: FormItemType.text
    },
    {
      name: 'In ways has this person left a negative impact on Zuzalu? How could they improve upon their contributions to the community?',
      columnName: 'negativeImpact',
      type: FormItemType.text
    },
    {
      name: "Have there been any instances where this resident's behavior was inconsistent with Zuzalu's core values? Please provide an example.",
      columnName: 'negativeValue',
      description: 'What the core values are can be up to your interpretation.',
      type: FormItemType.text
    },
    {
      name: 'Would you recommend this person for the next Zuzalu?',
      columnName: 'recommendNextZuzalu',
      type: FormItemType.radio,
      required: true,
      options: ['Strong Yes', 'Yes', 'Unsure', 'No', 'Strong No']
    },
    {
      name: 'How well do you know this person?',
      columnName: 'familiarity',
      description:
        "Vouching for someone's ability is one thing, vouching for someone as a holistic person is another.",
      type: FormItemType.radio,
      required: true,
      options: [
        'Very Familiar',
        'Familiar',
        'Somewhat Familiar',
        'Not Familiar'
      ]
    },
    {
      name: "If you choose to opt out, your application will not take any other's responses into consideration.",
      columnName: 'optOut',
      type: FormItemType.boolean
    }
  ]
};
