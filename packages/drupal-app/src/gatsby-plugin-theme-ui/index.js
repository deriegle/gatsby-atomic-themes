import 'typeface-pacifico';
import 'typeface-oswald';
import { roboto } from '@theme-ui/presets';
export default {
	...roboto,
	colors: {
		...roboto.colors,
		white: '#fff',
	},
	fonts: {
    body: 'Oswald, system-ui, sans-serif',
    heading: 'Pacifico, system-ui, sans-serif',
    monospace: '"Roboto Mono", monospace',
  },
};