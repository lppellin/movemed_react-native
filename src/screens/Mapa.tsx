import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { RouteProp } from "@react-navigation/native";


type RouteParams = {
    params: {
        origem: {
            latitude: number;
            longitude: number;
            nome: string;
        };
        destino: {
            latitude: number;
            longitude: number;
            nome: string;
        };
    };
};

const Mapa = ({ route }: { route: RouteProp<RouteParams, 'params'> }) => {
    const { origem, destino } = route.params;

    const GOOGLE_MAPS_API_KEY = "AIzaSyAtzc7VuWCuG9X50GKtD5siTju-dnYeDl0";

    const mapRef = useRef<MapView>(null);

    // Cálculo do ponto médio para a região inicial
    const initialRegion = {
        latitude: (origem.latitude + destino.latitude) / 2,
        longitude: (origem.longitude + destino.longitude) / 2,
        latitudeDelta: 0.05, // Ajuste para um zoom mais largo
        longitudeDelta: 0.05, // Ajuste para um zoom mais largo
    };

    useEffect(() => {
        // Ajusta o mapa para mostrar a rota entre origem e destino
        if (mapRef.current) {
            mapRef.current.fitToCoordinates(
                [
                    { latitude: origem.latitude, longitude: origem.longitude },
                    { latitude: destino.latitude, longitude: destino.longitude },
                ],
                {
                    edgePadding: { top: 20, right: 20, bottom: 20, left: 20 }, // Ajuste as margens conforme necessário
                    animated: true,
                }
            );
        }
    }, [origem, destino]);

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={initialRegion}
                onMapReady={() => {

                    if (mapRef.current) {
                        mapRef.current.fitToCoordinates(
                            [
                                { latitude: origem.latitude, longitude: origem.longitude },
                                { latitude: destino.latitude, longitude: destino.longitude },
                            ],
                            {
                                edgePadding: { top: 20, right: 20, bottom: 20, left: 20 },
                                animated: true,
                            }
                        );
                    }
                }}
            >
                {/* Marcadores de Origem e Destino */}
                <Marker
                    coordinate={{ latitude: origem.latitude, longitude: origem.longitude }}
                    title={origem.nome}
                    description="Ponto de origem"
                />
                <Marker
                    coordinate={{ latitude: destino.latitude, longitude: destino.longitude }}
                    title={destino.nome}
                    description="Ponto de destino"
                />

                {/* Direção entre Origem e Destino */}
                <MapViewDirections
                    origin={{ latitude: origem.latitude, longitude: origem.longitude }}
                    destination={{ latitude: destino.latitude, longitude: destino.longitude }}
                    apikey={GOOGLE_MAPS_API_KEY}
                    strokeWidth={4}
                    strokeColor="blue"
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});

export default Mapa;
