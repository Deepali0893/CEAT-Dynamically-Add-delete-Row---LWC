import { LightningElement,track,api } from 'lwc';
import getmonthYearPickList from "@salesforce/apex/BrandClassOfftakeHelper.getmonthYearPicklist";
import applicationPickList from "@salesforce/apex/BrandClassOfftakeHelper.getapplicationPicklist";
import tyreBrandPickList from "@salesforce/apex/BrandClassOfftakeHelper.gettyreBrandPicklist";
import tyreClassPickList from "@salesforce/apex/BrandClassOfftakeHelper.gettyreClassPicklist";
import tyrePatternPickList from "@salesforce/apex/BrandClassOfftakeHelper.gettyrePatternsPicklist";
import indirectFleetDealerPickList from "@salesforce/apex/BrandClassOfftakeHelper.getindirectFleetValue";
import insertRecs from "@salesforce/apex/BrandClassOfftakeHelper.insertBrandClassOfftake";
import indirectDealer from "@salesforce/apex/BrandClassOfftakeHelper.checkIndirectFleetDealer";

export default class BrandClassOffTake extends LightningElement {
@track id;
@track listOfRecords;
@track monthYearOptions;
@track applicationOptions;
@track tyreBrandOptions;
@track tyreClassOptions;
@track tyrePatternOptions;
@track indirectFleetDealerOption;
@api recordId;
@track tyreBrand;
@track showIndirectFleetDealer;
keyIndex = 0;
@track responseMessage;
@track response;
@track defaultBrand;
@track monthYearError = false;
@track monthYearErrorMessage;
@track applicationError = false;
@track applicationErrorMessage;
@track brandError = false;
@track brandErrorMessage;
@track tyreClassError = false;
@track tyreClassErrorMessage;
@track tyrePatternError = false;
@track tyrePatternErrorMessage;
@track offTakeError = false;
@track offTakeErrorMessage;
@track indirectFleetDealerError = false;
@track indirectFleetDealerErrorMessage;
connectedCallback(){
   // alert('recID'+this.recordId);
    this.getpicklistValues();
    this.checkIndirectDealer();
    
}

checkIndirectDealer(){
    indirectDealer({recordId:this.recordId})
        .then((result) => {
            //alert('=result='+result);
            if(result == true){
                this.showIndirectFleetDealer = true;
            }
            else{
                this.showIndirectFleetDealer = false;
            }

        })
}


getpicklistValues(){
    //monthYear
    getmonthYearPickList({})
        .then((result) => {
            let options = [];
            if (result) {
                result.forEach(r => {
                options.push({
                label: r,
                value: r,
            });
            });
        }
        this.monthYearOptions = options;
        applicationPickList({})
        .then((result) => {
            let options = [];
            if (result) {
                result.forEach(r => {
                options.push({
                label: r,
                value: r,
            });
            });
        }
        this.applicationOptions = options;
        tyreBrandPickList({})
        .then((result) => {
            let options = [];
            if (result) {
                result.forEach(r => {
                options.push({
                label: r,
                value: r,
            });
            });
        }
        this.tyreBrandOptions = options;
        tyreClassPickList({})
        .then((result) => {
            let options = [];
            if (result) {
                result.forEach(r => {
                options.push({
                label: r,
                value: r,
            });
            });
        }
        //this.tyreClassOptions = options;
        tyrePatternPickList({})
        .then((result) => {
            let options = [];
            if (result) {
                result.forEach(r => {
                options.push({
                label: r,
                value: r,
            });
            });
        }
        //this.tyrePatternOptions = options;
        indirectFleetDealerPickList({recordId:this.recordId})
        .then((result) => {
            let options = [];
            if (result) {
                //alert('=result='+JSON.stringify(result));
                for(let key in result) {
                    // Preventing unexcepted data
                    if (result.hasOwnProperty(key)) { // Filtering the data in the loop
                        options.push({value:result[key], label:key});
                    }
                }
            }
            this.indirectFleetDealerOption = options;
            this.listOfRecords = [{
                id: 0,
                monthYear:this.monthYearOptions,
                application:this.applicationOptions,
                brand:this.tyreBrandOptions,
                tyreClass:this.tyreClassOptions,
                tyrePattern:this.tyrePatternOptions,
                offTake:"",
                indirectFleetDealer:this.indirectFleetDealerOption
    
            }]  

            this.listOfRecords = [...this.listOfRecords];

        })
		
		})
		
		})
		
		})

    })
        
    })
    return this.listOfRecords;
        
}
AddNewRow(){
  ++this.keyIndex;
  //var newItem = [{ id: this.keyIndex }];
  let recs =JSON.parse(JSON.stringify(this.listOfRecords));
  //alert('=recs='+JSON.stringify(recs[0].monthYear));
  

  recs[0].id = this.keyIndex;
  recs[0].tyreClass = '';
  recs[0].tyrePattern = '';
  this.listOfRecords.push(recs[0]);
  //alert('=lis='+JSON.stringify(this.listOfRecords));
  console.log('=lis='+JSON.stringify(this.listOfRecords));
  this.listOfRecords = [...this.listOfRecords];
 // this.listOfRecords = [...this.listOfRecords,recs[0]];

}
removeRow(event){
    /*
    var selectedVal = event.target.name;
    this.listOfRecords.splice(selectedVal, 1);
    this.listOfRecords.slice();
    */
    //alert('-length-'+this.listOfRecords.length);
    if (this.listOfRecords.length >= 2) {
        this.listOfRecords = this.listOfRecords.filter(function (element) {
            //alert('p1'+parseInt(element.id));
            //alert('p2'+parseInt(event.target.accessKey));
            return parseInt(element.id) !== parseInt(event.target.accessKey);
        });
    }

}
cloneRow(event){
    var selectedVal = event.target.name;
    
    let offTakeInputs = this.template.querySelectorAll('lightning-input');
    const offTakeValue = offTakeInputs[selectedVal].value;
    //this.defaultBrand = [{"label":"Apollo","value":"Apollo"}];
    ++this.keyIndex;
    let recs =JSON.parse(JSON.stringify(this.listOfRecords));
    let brand = 'Apollo';
    recs[0].id = this.keyIndex;
    recs[0].brand = this.listOfRecords[selectedVal].brand;
    recs[0].tyreClass = this.listOfRecords[selectedVal].tyreClass;
    recs[0].offTake = offTakeValue;

    this.listOfRecords.push(recs[0]);

    this.listOfRecords = [...this.listOfRecords];
    return;



  var records=[];
  var selectedVal = event.target.name;
  alert('=selectedVal='+selectedVal);
 /* ++this.keyIndex;
  let recs =JSON.parse(JSON.stringify(this.listOfRecords));
  alert('test'+recs[0].tyreClass);
  recs[0].id = this.keyIndex;
  recs[0].tyreClass = this.listOfRecords[selectedVal].tyreClass;
  recs[0].brand.value = 'Apollo';
  this.listOfRecords.push(recs[0]);
  this.listOfRecords = [...this.listOfRecords];
  */
  
  //let rows = Array.from(this.template.querySelectorAll("tr.inputRows") );
  
    let rows = Array.from(this.template.querySelectorAll("tr.inputRows"));
    alert('=length='+rows.length);
      for (var i = 0; i < rows.length; i++) {
        //console.log('fakeImage: ', fakeImages[i]);
        if(i==selectedVal){
          alert('=wow='+rows[0]);
          let texts = Array.from(rows[0].querySelectorAll(".fields"));
          alert('texts wow'+texts);
          if(texts)
          {
                  var textVal=this.fieldValues(texts);
                  alert('=textVal='+JSON.stringify(textVal));
                  records=[...records,textVal];
          }
         // return rows[0];
        }
      }
      //recs[0].brand.value = 'Apollo';

    
}
handleBrandChange(event){
    var selectedVal = event.target.name;
    var brand = event.target.value;
    this.tyreBrand = brand;
    //alert('=brand='+brand);
   // alert('recs'+JSON.stringify(this.listOfRecords[selectedVal]));
    //console.log('recs'+JSON.stringify(this.listOfRecords[selectedVal]));

    tyreClassPickList({tyreBrand:brand})
        .then((result) => {
            let options = [];
            if (result) {
                result.forEach(r => {
                options.push({
                label: r,
                value: r,
            });
            });
        }
        //alert('=opt='+options);
        this.listOfRecords[selectedVal].tyreClass = options;


    
    })
}
handleTyreClassChange(event){
    var selectedVal = event.target.name;
    var brand = this.tyreBrand;
    var tyreClass = event.target.value;
    //alert('=tyreClass='+tyreClass);
    //alert('=brand2='+brand);
    tyrePatternPickList({tyreBrand:brand,tyreClass:tyreClass})
    .then((result) => {
        let options = [];
        if (result) {
            result.forEach(r => {
            options.push({
            label: r,
            value: r,
        });
        });
    }
    this.listOfRecords[selectedVal].tyrePattern = options;
    })
    

}

save(event){
    let rows = Array.from(this.template.querySelectorAll("tr.inputRows") );
    var records=[];
    var recordToSave;
    rows.map(row => {
        let texts = Array.from(row.querySelectorAll(".fields"));
       // alert('=texts='+texts);
        if(texts)
        {
                var textVal=this.fieldValues(texts);
               // alert('=textVal='+JSON.stringify(textVal));
                records=[...records,textVal];
        }

    });
    //alert('=records='+JSON.stringify(records));
    if(this.validateFields(records) == true){
        //alert('in');
        recordToSave = JSON.stringify(records);
        insertRecs({ recs: recordToSave,recordId:this.recordId})
            .then((result) => {
                //alert(''+result);
                if(result == true){

                    //window.history.back();
                    const closeQA = new CustomEvent('close');
                    // Dispatches the event.
                    this.dispatchEvent(closeQA);
                }
            })
            .catch((error) => {
                this.error = error;
                this.contacts = undefined;
            });
        }
    }
fieldValues(cells)
{
    var obj = new Object();
    return cells.reduce((record, cell) => {
    let inputVal = cell.value;
   // alert('=cell='+inputVal);
    if(inputVal!=undefined)
    {
       // alert('=='+cell.label); offTake
       
       if(cell.label == 'offTake'){
        if(inputVal){   
            record[cell.label] = inputVal;
        }
        else{
            record[cell.label] = 0;

        }
       }
       else{
        record[cell.label] = inputVal;
       }
       
    }
    return record;
        }, {});
    }

    validateFields(records){
        this.monthYearError = false;
        this.applicationError = false;
        this.brandError = false;
        this.tyreClassError = false;
        this.tyrePatternError = false;
        this.offTakeError = false;
        this.indirectFleetDealerError = false;
      for(let i=0;i<records.length;i++){
        if(typeof(records[i].monthYear) == 'undefined'){
            this.monthYearError = true;
            this.monthYearErrorMessage = 'Month/Year is required Field';
        }
        if(typeof(records[i].application) == 'undefined'){
            this.applicationError = true;
            this.applicationErrorMessage = 'Application is required Field';
        }
        
        if(typeof(records[i].tyreClass) == 'undefined'){
            this.tyreClassError = true;
            this.tyreClassErrorMessage = 'Class is required Field';
        }
        if(typeof(records[i].tyrePattern) == 'undefined'){
            this.tyrePatternError = true;
            this.tyrePatternErrorMessage = 'Tyre Pattern is required Field';
        }
        if(records[i].offTake == 0){
            alert('=offtake='+records[i].offTake);
            this.offTakeError = true;
            this.offTakeErrorMessage = 'Offtake is required Field';
        }
        if(typeof(records[i].brand) == 'undefined'){
            this.brandError = true;
            this.brandErrorMessage = 'Brand is required Field';
        }
        if(records[i].brand == 'CEAT' && typeof(records[i].indirectFleetDealer) === 'undefined' ){
            this.indirectFleetDealerError = true;
            this.indirectFleetDealerErrorMessage = 'Indirect Fleet Dealer is a required Field';

        }
        
      }
      if(this.monthYearError==false && this.applicationError==false && this.tyreClassError==false 
                 && this.tyrePatternError==false && this.offTakeError == false && this.brandError == false &&
                 this.indirectFleetDealerError == false){
                return true;

      }
      else{
          return false;
      }

    }
    Cancel(){
        const closeQA = new CustomEvent('close');
                    // Dispatches the event.
                    this.dispatchEvent(closeQA);

    }

    
}
