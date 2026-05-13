import { ContentItem } from '@/types/content'

export const mockContentItems: ContentItem[] = [
  {
    id: 'c1',
    title: 'GST Input Tax Credit: Complete Guide for 2025',
    keyword: 'gst input tax credit rules 2024',
    wordCount: 2840,
    status: 'pending_approval',
    createdAt: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
    seoSignals: [
      { label: 'Keyword density', score: 92, status: 'good' },
      { label: 'Readability', score: 78, status: 'good' },
      { label: 'Internal links', score: 55, status: 'warning' },
      { label: 'Meta description', score: 100, status: 'good' },
      { label: 'Header structure', score: 88, status: 'good' },
    ],
    outline: [
      {
        heading: 'What is Input Tax Credit?',
        points: ['Definition under GST Act', 'Who can claim ITC', 'Conditions for eligibility'],
      },
      {
        heading: 'How to Claim ITC in 2025',
        points: ['Step-by-step process', 'Required documents', 'GSTR-3B and GSTR-2B reconciliation'],
      },
      {
        heading: 'Common ITC Mistakes to Avoid',
        points: ['Claiming ITC on blocked credits', 'Missing the deadline', 'Supplier non-compliance'],
      },
      {
        heading: 'ITC Reversal Scenarios',
        points: ['Non-payment to supplier', 'Exempt supplies', 'Capital goods'],
      },
    ],
    trafficForecast: { month1: 420, month3: 1800, month6: 4200 },
    publishSettings: {
      category: 'GST Compliance',
      tags: ['GST', 'ITC', 'Tax', 'India'],
      scheduledFor: new Date(Date.now() + 24 * 60 * 60000).toISOString(),
    },
  },
  {
    id: 'c2',
    title: 'TDS Rate Chart AY 2024-25: Section-wise Guide',
    keyword: 'tds rate chart 2024-25',
    wordCount: 3120,
    status: 'pending_approval',
    createdAt: new Date(Date.now() - 5 * 60 * 60000).toISOString(),
    seoSignals: [
      { label: 'Keyword density', score: 95, status: 'good' },
      { label: 'Readability', score: 82, status: 'good' },
      { label: 'Internal links', score: 72, status: 'good' },
      { label: 'Meta description', score: 100, status: 'good' },
      { label: 'Header structure', score: 90, status: 'good' },
    ],
    outline: [
      {
        heading: 'TDS Rate Chart Overview',
        points: ['What is TDS', 'Applicable for AY 2024-25', 'Key changes from last year'],
      },
      {
        heading: 'Section 192 – Salary',
        points: ['Applicable rates', 'Threshold limits', 'New tax regime vs old'],
      },
      {
        heading: 'Section 194C – Contractor Payments',
        points: ['Rate: 1% (individual) / 2% (others)', 'Threshold: ₹30,000 / ₹1,00,000', 'Exemptions'],
      },
      {
        heading: 'Section 194J – Professional Fees',
        points: ['Rate: 10%', 'Technical services: 2%', 'Threshold: ₹30,000'],
      },
    ],
    trafficForecast: { month1: 1200, month3: 5400, month6: 9800 },
    publishSettings: {
      category: 'TDS & Tax',
      tags: ['TDS', 'Tax', 'AY 2024-25', 'India'],
    },
  },
  {
    id: 'c3',
    title: 'Best Accounting Software for Small Businesses in India (2025)',
    keyword: 'best accounting software for small business india',
    wordCount: 2650,
    status: 'pending_approval',
    createdAt: new Date(Date.now() - 10 * 60 * 60000).toISOString(),
    seoSignals: [
      { label: 'Keyword density', score: 88, status: 'good' },
      { label: 'Readability', score: 91, status: 'good' },
      { label: 'Internal links', score: 40, status: 'warning' },
      { label: 'Meta description', score: 100, status: 'good' },
      { label: 'Header structure', score: 85, status: 'good' },
    ],
    outline: [
      {
        heading: 'What to Look for in Accounting Software',
        points: ['GST compliance', 'Ease of use', 'Pricing', 'Integrations'],
      },
      {
        heading: 'Top Picks for 2025',
        points: ['Zoho Books', 'Tally Prime', 'QuickBooks India', 'Vyapar', 'Busy Accounting'],
      },
      {
        heading: 'Comparison Table',
        points: ['Pricing tiers', 'GST features', 'User limit', 'Mobile app'],
      },
      {
        heading: 'Our Recommendation',
        points: ['Best for solopreneurs', 'Best for growing businesses', 'Best for CA firms'],
      },
    ],
    trafficForecast: { month1: 680, month3: 2400, month6: 5100 },
    publishSettings: {
      category: 'Accounting Software',
      tags: ['Accounting', 'Software', 'Small Business', 'India'],
    },
  },
  {
    id: 'c4',
    title: 'Salary Slip Format India: Free Download + Guide',
    keyword: 'salary slip format india',
    wordCount: 1980,
    status: 'approved',
    createdAt: new Date(Date.now() - 24 * 60 * 60000).toISOString(),
    seoSignals: [
      { label: 'Keyword density', score: 94, status: 'good' },
      { label: 'Readability', score: 88, status: 'good' },
      { label: 'Internal links', score: 80, status: 'good' },
      { label: 'Meta description', score: 100, status: 'good' },
      { label: 'Header structure', score: 92, status: 'good' },
    ],
    outline: [
      {
        heading: 'What is a Salary Slip?',
        points: ['Legal requirement', 'Components', 'Gross vs net salary'],
      },
      {
        heading: 'Standard Format in India',
        points: ['Employee details', 'Earnings section', 'Deductions section', 'Net pay'],
      },
    ],
    trafficForecast: { month1: 1400, month3: 5800, month6: 11200 },
    publishSettings: {
      category: 'Payroll & HR',
      tags: ['Salary Slip', 'Payroll', 'HR', 'India'],
      scheduledFor: new Date(Date.now() + 2 * 60 * 60000).toISOString(),
    },
  },
]
