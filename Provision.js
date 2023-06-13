const hourly = Date.now(3600000);

// Refresh basic parameters hourly
declare("InternetGatewayDevice.DeviceInfo.HardwareVersion", {path: hourly, value: hourly});
declare("InternetGatewayDevice.DeviceInfo.SoftwareVersion", {path: hourly, value: hourly});
declare("VirtualParameters.MAC", {path: hourly, value: hourly});
declare("InternetGatewayDevice.LANDevice.*.LANEthernetInterfaceConfig.*.MACAddress", {path: hourly, value: hourly});
declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANIPConnection.*.ExternalIPAddress", {path: hourly, value: hourly});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.SSID", {path: hourly, value: hourly});
// Don't refresh password field periodically because CPEs always report blank passowrds for security reasons
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.KeyPassphrase", {path: hourly, value: 1});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.X_TP_PreSharedKey", {path: hourly, value: 1});
declare("InternetGatewayDevice.LANDevice.*.WLANConfiguration.*.X_CUDY_Password", {path: hourly, value: 1});
declare("InternetGatewayDevice.LANConfigSecurity.ConfigPassword", {path: hourly, value: 1});

declare("InternetGatewayDevice.LANDevice.*.Hosts.Host.*.HostName", {path: hourly, value: hourly});
declare("InternetGatewayDevice.LANDevice.*.Hosts.Host.*.IPAddress", {path: hourly, value: hourly});
declare("InternetGatewayDevice.LANDevice.*.Hosts.Host.*.MACAddress", {path: hourly, value: hourly});
declare("InternetGatewayDevice.WANDevice.*.WANConnectionDevice.*.WANPPPConnection.*.Username", {path: hourly, value: hourly});
declare("cwmp.connectionRequestAuth", {path: hourly, value: hourly});

let fabricante = declare("DeviceID.Manufacturer", {value: 1}).value[0];

if (fabricante == 'ZTE'){
	let ppp = declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.2.Username", {value: 1}).value[0];
	if (ppp == 'tr069'){
		let maclan = declare("InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.1.MACAddress", {value: 1}).value[0];
        let macwan = declare("VirtualParameters.MAC", {value: 1}).value[0];
        let respmacwan = ext("getMacwan", "getMacwan", macwan)
        if (respmacwan.status != 404){
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID", {value: 1}, {value: respmacwan.ssid});
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.SSID", {value: 1}, {value: respmacwan.ssid5g});
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_TP_PreSharedKey", {value: 1}, {value: respmacwan.password});
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.X_TP_PreSharedKey", {value: 1}, {value: respmacwan.password});
            declare("InternetGatewayDevice.LANConfigSecurity.ConfigPassword", {value: 1}, {value: respmacwan.password});
            declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username", {value: 1}, {value: respmacwan.login});
            declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password", {value: 1}, {value: respmacwan.senha});
        }else{
            let respmaclan = ext("getClientes", "getCliente", maclan);
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID", {value: 1}, {value: respmaclan.ssid});
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.SSID", {value: 1}, {value: respmaclan.ssid5g});
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_TP_PreSharedKey", {value: 1}, {value: respmaclan.password});
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.X_TP_PreSharedKey", {value: 1}, {value: respmaclan.password});
            declare("InternetGatewayDevice.LANConfigSecurity.ConfigPassword", {value: 1}, {value: respmaclan.password});
            declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username", {value: 1}, {value: respmaclan.login});
            declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password", {value: 1}, {value: respmaclan.senha});
        }   
	}
}
else if (fabricante == 'TP-Link'){
	let ppp = declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username", {value: 1}).value[0];
	if (ppp == 'tr069'){
		let maclan = declare("InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.1.MACAddress", {value: 1}).value[0];
        let macwan = declare("VirtualParameters.MAC", {value: 1}).value[0];
        let respmacwan = ext("getMacwan", "getMacwan", macwan)
        if (respmacwan.status != 404){
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID", {value: 1}, {value: respmacwan.ssid});
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.SSID", {value: 1}, {value: respmacwan.ssid5g});
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_TP_PreSharedKey", {value: 1}, {value: respmacwan.password});
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.X_TP_PreSharedKey", {value: 1}, {value: respmacwan.password});
            declare("InternetGatewayDevice.LANConfigSecurity.ConfigPassword", {value: 1}, {value: respmacwan.password});
            declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username", {value: 1}, {value: respmacwan.login});
            declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password", {value: 1}, {value: respmacwan.senha});
        }else{
            let respmaclan = ext("getClientes", "getCliente", maclan);
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID", {value: 1}, {value: respmaclan.ssid});
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.SSID", {value: 1}, {value: respmaclan.ssid5g});
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_TP_PreSharedKey", {value: 1}, {value: respmaclan.password});
            declare("InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.X_TP_PreSharedKey", {value: 1}, {value: respmaclan.password});
            declare("InternetGatewayDevice.LANConfigSecurity.ConfigPassword", {value: 1}, {value: respmaclan.password});
            declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username", {value: 1}, {value: respmaclan.login});
            declare("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password", {value: 1}, {value: respmaclan.senha});
        }
		
	}
}