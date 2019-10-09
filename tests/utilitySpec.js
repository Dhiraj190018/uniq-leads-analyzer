const utility = require("../utility");

const leads = "[{\"_id\":\"jkj238238jdsnfsj23\",\"email\":\"foo@bar.com\",\"firstName\":\"John\",\"lastName\":\"Smith\",\"address\":\"123 Street St\",\"entryDate\":\"2014-05-07T17:30:20+00:00\",\"rank\":1},{\"_id\":\"edu45238jdsnfsj23\",\"email\":\"mae@bar.com\",\"firstName\":\"Ted\",\"lastName\":\"Masters\",\"address\":\"44 North Hampton St\",\"entryDate\":\"2014-05-07T17:31:20+00:00\",\"rank\":2},{\"_id\":\"wabaj238238jdsnfsj23\",\"email\":\"bog@bar.com\",\"firstName\":\"Fran\",\"lastName\":\"Jones\",\"address\":\"8803 Dark St\",\"entryDate\":\"2014-05-07T17:31:20+00:00\",\"rank\":3},{\"_id\":\"jkj238238jdsnfsj23\",\"email\":\"coo@bar.com\",\"firstName\":\"Ted\",\"lastName\":\"Jones\",\"address\":\"456 Neat St\",\"entryDate\":\"2014-05-07T17:32:20+00:00\",\"rank\":4},{\"_id\":\"sel045238jdsnfsj23\",\"email\":\"foo@bar.com\",\"firstName\":\"John\",\"lastName\":\"Smith\",\"address\":\"123 Street St\",\"entryDate\":\"2014-05-07T17:32:20+00:00\",\"rank\":5},{\"_id\":\"qest38238jdsnfsj23\",\"email\":\"foo@bar.com\",\"firstName\":\"John\",\"lastName\":\"Smith\",\"address\":\"123 Street St\",\"entryDate\":\"2014-05-07T17:32:20+00:00\",\"rank\":6},{\"_id\":\"vug789238jdsnfsj23\",\"email\":\"foo1@bar.com\",\"firstName\":\"Blake\",\"lastName\":\"Douglas\",\"address\":\"123 Reach St\",\"entryDate\":\"2014-05-07T17:33:20+00:00\",\"rank\":7},{\"_id\":\"wuj08238jdsnfsj23\",\"email\":\"foo@bar.com\",\"firstName\":\"Micah\",\"lastName\":\"Valmer\",\"address\":\"123 Street St\",\"entryDate\":\"2014-05-07T17:33:20+00:00\",\"rank\":8},{\"_id\":\"belr28238jdsnfsj23\",\"email\":\"mae@bar.com\",\"firstName\":\"Tallulah\",\"lastName\":\"Smith\",\"address\":\"123 Water St\",\"entryDate\":\"2014-05-07T17:33:20+00:00\",\"rank\":9},{\"_id\":\"jkj238238jdsnfsj23\",\"email\":\"bill@bar.com\",\"firstName\":\"John\",\"lastName\":\"Smith\",\"address\":\"888 Mayberry St\",\"entryDate\":\"2014-05-07T17:33:20+00:00\",\"rank\":10}]"
// Sample test to shoecase the use of testing framework
describe("Utility Tests", function () {
    describe("groupBy", function () {
        const array = JSON.parse(leads)
        it("leads are grouped by _id", function () {            
            const groupedByIdResult = utility.groupBy(array, "_id")            
            expect(groupedByIdResult["jkj238238jdsnfsj23"].length).toEqual(3);
        });
    });
});