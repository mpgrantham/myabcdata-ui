import React from 'react';
import { Page, Text, View, Document, StyleSheet  } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#ffffff'
    },
    outerSection: {
      flexDirection: 'row',
      fontSize: 9,
      flex: 1
    },
    row: {
      flexDirection: 'row'
    },
    entrySection: {
      margin: 10,
      flex: 1,
      borderColor: '#000000',
      borderStyle: 'solid',
      borderWidth:  1,
      flexDirection: 'column'
    },
    abcGroup: {
      marginTop: 5,
      marginBottom: 5,
      padding: 0,
      flexDirection: 'row',
      flex: 1,
      borderTopColor: '#000000',
      borderTopStyle: 'solid',
      borderTopWidth:  1,
      borderBottomColor: '#000000',
      borderBottomStyle: 'solid',
      borderBottomWidth:  1
    },
    abcSection: {
      margin: 0,
      padding: 0,
      flexDirection: 'column',
      flex: 1,
      borderRightColor: '#000000',
      borderRightStyle: 'solid',
      borderRightWidth:  1
    },
    abcSectionNoBorder: {
      margin: 0,
      padding: 0,
      flexDirection: 'column',
      flex: 1
    },
    text: {
      padding: 5,
      flex: 1
    },
    description: {
      padding: 5,
      flex: 1,
      height: 50
    },
    abcHeader: {
      textAlign: 'center',
      paddingTop: 3,
      paddingBottom: 3,
      flex: 1,
      maxHeight: 20,
      minHeight: 20,
      backgroundColor: '#dddddd',
      borderBottomColor: '#000000',
      borderBottomStyle: 'solid',
      borderBottomWidth:  1
    },
    abcEntry: {
      paddingLeft: 10,
      paddingTop: 5,
      paddingBottom: 3,
      paddingRight: 0,
      maxHeight: 20,
      minHeight: 20,
      flex: 1
    },
    title: {
      paddingLeft: 10,
      paddingTop: 10,
      flex: 1,
      fontSize: 12
    }
});
  

const Datasheet = ({observed}) => {

    const buildAbcSection = (label, values, displayRightBorder) => {

        const abcs = values 
          ?   values.map((v) => {
                return <View style={styles.abcEntry} key={v.valueId}><Text>{v.typeValue}</Text></View>;
              })
          : [];

        return (
            <View style={displayRightBorder ? styles.abcSection : styles.abcSectionNoBorder}>
                <View style={styles.abcHeader}><Text>{label}</Text></View>
                {abcs}
            </View>
        );
    }
    
    const buildEntrySection = () => {

        return (
            <View style={styles.entrySection}>
                <View style={styles.row}>
                    <View style={styles.text}><Text>Date/Time:</Text></View>
                    <View style={styles.text}><Text>Location:</Text></View>
                </View>
    
                <View style={styles.row}>
                    <View style={styles.text}><Text>Duration:</Text></View>
                    <View style={styles.text}><Text>Intensity:</Text></View>
                </View>
    
                <View style={styles.abcGroup}>
                    {buildAbcSection('Antecedent', observed.antecedents, true)}
                    {buildAbcSection('Behavior', observed.behaviors, true)}
                    {buildAbcSection('Consequence', observed.consequences, false)}
                </View>
    
                <View style={styles.row}>
                    <View style={styles.description}><Text>Description:</Text></View>
                </View>
            </View>
        );
    }

    const entrySection = buildEntrySection();

    return (

        <Document>
        <Page size="A4" style={styles.page} orientation="landscape" wrap>

            <View style={styles.row}><Text style={styles.title}>Observed: {observed.observedNm}</Text></View>
         
            <View style={styles.outerSection}>
                {entrySection}
                {entrySection}
            </View>

            <View style={styles.row} break><Text style={styles.title}>Observed: {observed.observedNm}</Text></View>

            <View style={styles.outerSection}>
                {entrySection}
                {entrySection}
            </View>
          
    
        </Page>
      </Document>

    );

}

export default Datasheet;