import 'reflect-metadata';
import { dataSource } from 'ormconfig';
import { runSeeders } from 'typeorm-extension';
import { appInstanceExists, closeAppInstance } from 'src/app-context';

async function run() {
  try {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
    await runSeeders(dataSource, {
      seedTracking: true,
    });
    console.log('Seeders executed successfully');
  } catch (error) {
    console.error('Error executing seeders:', error.message);
  } finally {
    if (appInstanceExists()) {
      closeAppInstance();
    } else {
      await dataSource.destroy();
    }
  }
}

run().catch((error) => console.error(error));
