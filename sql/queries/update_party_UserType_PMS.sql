UPDATE party SET UserType = 'PMS' WHERE ID IN (SELECT partner.PartyID FROM partner);
SELECT * FROM party WHERE ID IN (SELECT partner.PartyID FROM partner);