/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var transactionModel;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.initDb();        
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);               
         Polymer('element-timeline',
         {
            trashClicked : function()
            {
                var elementId = this.transId;
                var arrayIndex = this.arrayIndex;
                // var listTemplate = document.querySelector('form-timeline').shadowRoot.querySelector('#summaries');
                var formArray = document.querySelector('form-timeline').summaryTemp;
                // console.log(elementId);
                // console.log(arrayIndex);
                // console.log(formArray);
                TransactionModel.findBy(persistence, 'id',elementId,function(res)
                {
                  persistence.remove(res);
                  formArray.splice(arrayIndex, 1);
                  persistence.flush()

                  ;
                });                
              }
        });
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.initDb();
        // app.receivedEvent('deviceready');     
        // console.log("ready");
    },    
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        
    },
    initDb : function()
    {        
        console.log("Executing Db");
        if(window.openDatabase)
        {
            persistence.store.websql.config(persistence, "plusmin", 'database', 5 * 1024 * 1024);
        }else{
            persistence.store.memory.config(persistence);
        }
        TransactionModel = persistence.define('Transaction', {
            date: "TEXT",
            description: "TEXT",
            amount : "TEXT",
            plus : "BOOL"
        });        
        persistence.schemaSync();        

    }
};


