import React from 'react'
import App from '../src/App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://data-api.energidataservice.dk/v1/graphql',
  cache: new InMemoryCache(),
})

export default {
  title: 'Templates',
  component: App,
}

const Template = (args) => (
  <ApolloProvider client={client}>
    <App {...args} />
  </ApolloProvider>
)
export const TransmissionLines = Template.bind({})

TransmissionLines.args = {
  apiUri: 'https://data-api.energidataservice.dk/v1/',
  dataset: 'transmissionlines',
  schema: {
    fields: [
      {
        title: 'Hour UTC',
        description:
          'A date and time (interval), shown in _UTC time zone_, where the values are valid. 00:00 o\\u2019clock is the first hour of a given day interval  00:00 - 00:59 and 01:00 covers the second hour (interval) of the day and so forth. Please note: The naming is based on the length of the interval of the finest grain of the resolution.',
        comment:
          'Please note that the _format_ shown in the example applies to data download as JSON, XML or fetched through the API and is in accordance with the ISO 8601 standard.\r\nThe format is slightly different when it is shown on screen or downloaded manually as CSV or XLSX. This is mainly due to readability and consideration for Excel users.\r\n\r\n**In preview (in the GUI)** all timestamps are shown as (display convention)\r\nYYYY-MM-DD hh:mmZ\r\ne.g. 2017-07-14 08:00Z. \r\nThe Z will remind viewers that this is UTC.\r\n\r\nIn **download (CSV and XLSX)** the date time are exported as\r\nYYYY-MM-DD hh:mm\r\ne.g. 2017-07-14 08:00.\r\nThat is without the \\u201cT\\u201d and the \\u201cZ\\u201d and the seconds. Excel will recognize it as date-time. The user must remember the convention about time zones.\r\n\r\nIn **download (JSON and XML)** the full format is used\r\nYYYY-MM-DDThh:mmZ\r\ne.g. 2017-07-14T08:00Z.\r\n',
        name: 'HourUTCCDCC',
        type: 'datetime',
        unit: '',
        size: '17',
        example: '2017-07-14T08:00Z',
        format: '',
        property_constraint: '',
        validation_rules: 'Always full hours, i.e. minutes are 00',
      },
      {
        title: 'Hour DK',
        description:
          'A date and time (interval), shown in _Danish time zone_, where the values are valid. 00:00 o\\u2019clock is the first hour of a given day, interval 00:00 - 00:59, and 01:00 covers the second hour period (interval) of the day and so forth. ',
        comment:
          'On one normal day there will be 24 intervals.\r\n\r\nWhen daylight saving times shifts there will be either 23 or 25 intervals.\r\n\r\nPlease note that the _format_ shown in the example applies to data download as JSON, XML or fetched through the API and is in accordance with the ISO 8601 standard.\r\nThe format is slightly different when it is shown on screen or downloaded manually as CSV or XLSX. This is mainly due to readability and consideration for Excel users.\r\n\r\n**In preview (in the GUI)** all timestamps are shown as (display convention)\r\nYYYY-MM-DD hh:mm\r\ne.g. 2017-07-14 08:00. \r\nPlease note that is no time zone indicator, showning that this is local (Danish) time.\r\n\r\nIn **download (CSV and XLSX)** the date time are exported as\r\nYYYY-MM-DD hh:mm\r\ne.g. 2017-07-14 08:00.\r\nThat is without the \\u201cT\\u201d and the seconds. Excel will recognize it as date-time. The user must remember that this is local (Danish) time.\r\n\r\nIn **download (JSON and XML)** the  format used is\r\nYYYY-MM-DDThh:mm\r\ne.g. 2017-07-14T08:00.',
        name: 'HourDK',
        type: 'datetime',
        unit: '',
        size: '17',
        example: '2017-07-14T08:00',
        format: '',
        property_constraint: '',
        validation_rules: 'Always full hours, i.e. minutes are 00',
      },
      {
        title: 'Price area',
        description:
          'Same as bidding zone. Denmark is divided in two price areas, or bidding zones, divided by the Great Belt. DK1 is west of the Great Belt and DK2 is east of the Great Belt. \n\n\n',
        comment:
          'If price area is \\u201cDK\\u201d, the data covers all Denmark.',
        name: 'PriceArea',
        type: 'string',
        unit: '',
        size: '3',
        example: 'DK1',
        format: 'DK1 | DK2',
        property_constraint: '',
        validation_rules: 'DK1 or DK2',
      },
      {
        title: 'Connected area',
        description: 'The destination area of the connection.',
        comment:
          'DK1 is the Jutland and Fyen and DK2 is Zealand and islands. DK1 is connected to Norway (Oslo), Sweden (SE3) and Germany (EPEX) DK2 to Sweden (SE4) and Germany (EPEX)',
        name: 'ConnectedArea',
        type: 'string',
        unit: 'text',
        size: '8',
        example: 'DK1',
        format: 'DK1 | DK2 | SE3 | SE4 | NO2 | DE',
        property_constraint: '',
        validation_rules:
          'One of the following values DK1, DK2. SE3, SE4, NO2, DE',
      },
      {
        title: 'Import capacity',
        description:
          'Import capacity from connected area to the area. The TSOs decide how much import capacity is to be transferred, and the capacity for the coming day is published at Nord Pool Spot every day before 10:00.',
        comment: '',
        name: 'ImportCapacity',
        type: 'number',
        unit: 'MWh per hour',
        size: '9.1',
        example: '184.3',
        format: '([0-9]*[,])[0-9]',
        property_constraint: '',
        validation_rules: '>=0',
      },
      {
        title: 'Export capacity',
        description:
          'Export capacity from area to the connected area. The TSOs decide how much export capacity is to be transferred, and the capacity for the coming day is published at Nord Pool Spot every day before 10:00.',
        comment: '',
        name: 'ExportCapacity',
        type: 'number',
        unit: 'MWh per hour',
        size: '9.1',
        example: '184.3',
        format: '([0-9]*[,])[0-9]',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Scheduled exchange day ahead',
        description:
          'Scheduled exchange on the transmission lines is the flow of electricity from areas of surplus to areas of deficit resulting from the Nord Pool Spots price calculation',
        comment:
          'Positive values are import from connected area to the area. Negative values are eksport from area to connected area.',
        name: 'ScheduledExchangeDayAhead',
        type: 'number',
        unit: 'MWh per hour',
        size: '9.1',
        example: '184.3',
        format: '([0-9]*[,])[0-9]',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Scheduled exchange intraday',
        description:
          'Scheduled exchange on the transmission lines is the flow of electricity from areas of surplus to areas of deficit resulting from the Nord Pool Spots price calculation',
        comment:
          'Positive values are import from connected area to the area. Negative values are eksport from area to connected area.',
        name: 'ScheduledExchangeIntraday',
        type: 'number',
        unit: 'MWh per hour',
        size: '9.1',
        example: '184.3',
        format: '([0-9]*[,])[0-9]',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Physical exchange non-validated',
        description:
          'Scheduled exchange on the transmission lines is the flow of electricity from areas of surplus to areas of deficit resulting from the Nord Pool Spots price calculation',
        comment:
          'Positive values are import from connected area to the area. Negative values are eksport from area to connected area.',
        name: 'PhysicalExchangeNonvalidated',
        type: 'number',
        unit: 'MWh per hour',
        size: '9.1',
        example: '184.3',
        format: '([0-9]*[,])[0-9]',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Physical exchange settlement',
        description:
          'Scheduled exchange on the transmission lines is the flow of electricity from areas of surplus to areas of deficit resulting from the Nord Pool Spots price calculation',
        comment:
          'Positive values are import from connected area to the area. Negative values are eksport from area to connected area.',
        name: 'PhysicalExchangeSettlement',
        type: 'number',
        unit: 'MWh per hour',
        size: '9.1',
        example: '184.3',
        format: '([0-9]*[,])[0-9]',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Congestion income (DKK)',
        description: '9.2',
        comment: '([0-9]*[,])[0-9][0-9]',
        name: 'CongestionIncomeDKK',
        type: 'number',
        unit: 'DKK per hour',
        size: '9.2',
        example:
          'Congestion income is calculated as the difference in spot prices between the two price areas multiplied by the estimated exchange between the two areas concerned.',
        format: 'Congestion income from connection between price areas.',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Home price (DKK)',
        description: 'Price in the home price area',
        comment: '',
        name: 'HomePriceDKK',
        type: 'number',
        unit: 'DKK per hour',
        size: '9.2',
        example: '543,45',
        format: '([0-9]*[,])[0-9][0-9]',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Connected price (DKK)',
        description: 'Price in the connected area',
        comment: '',
        name: 'ConnectedPriceDKK',
        type: 'number',
        unit: 'DKK per hour',
        size: '9.2',
        example: '300.0',
        format: '([0-9]*[,])[0-9][0-9]',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Congestion income (EUR)',
        description: 'Congestion income from connection between price areas.',
        comment:
          'Congestion income is calculated as the difference in spot prices between the two price areas multiplied by the estimated exchange between the two areas concerned.',
        name: 'CongestionIncomeEUR',
        type: 'number',
        unit: 'EUR per hour',
        size: '9.2',
        example: '300.0',
        format: '([0-9]*[,])[0-9][0-9]',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Home price (EUR)',
        description: 'Price in the home price area',
        comment: '',
        name: 'HomePriceEUR',
        type: 'number',
        unit: 'EUR per hour',
        size: '9.2',
        example: '543,45',
        format: '([0-9]*[,])[0-9][0-9]',
        property_constraint: '',
        validation_rules: '',
      },
      {
        title: 'Connected price (EUR)',
        description: 'Price in the connected area',
        comment: '',
        name: 'ConnectedPriceEUR',
        type: 'number',
        unit: 'EUR per hour',
        size: '9.2',
        example: '300.0',
        format: '([0-9]*[,])[0-9][0-9]',
        property_constraint: '',
        validation_rules: '',
      },
    ],
    primary_key: ['HourUTC', 'PriceArea', 'ConnectedArea'],
  },
}
