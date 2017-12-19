import { Product } from 'ClientApp/components/Items/ItemsInterfaces';
import { Klant } from '../../../TypescriptModels/Klant';

//For the admin pages that modify database entities

export interface IAdmin{
    EditEntity(entity : Product|Klant);
    DeleteEntity(entity : Product|Klant);
    CreateEntity()
    handleChangeSubmit(event: any);
}