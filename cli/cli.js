import { Command } from 'commander';
import { gendiff } from "../src/index.js";


export default () => {
    const program = new Command();

    program
      .name('gendiff')
      .description('Compares two configuration files and shows a difference.')
      .version('0.8.0')
      .argument('filepath1')
      .argument('filepath2')
      .option('-f, --format <type>', 'output format')
      .action((path1, path2) => {
      	  const result = gendiff(path1, path2);
          console.log(result);
      });

    program.parse();
}
